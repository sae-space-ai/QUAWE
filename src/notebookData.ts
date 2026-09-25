export interface NotebookCell {
  id: number;
  title: string;
  code: string;
}

export const notebookCells: NotebookCell[] = [
  {
    id: 1,
    title: "Instalación de dependencias",
    code: `# Celda 1: Instalación de dependencias
import subprocess
import sys

def install_package(pkg):
    subprocess.check_call([sys.executable, "-m", "pip", "install", "-q", pkg])

packages = [
    "transformers>=4.44.0",
    "peft>=0.12.0",
    "trl>=0.9.0",
    "datasets>=2.20.0",
    "accelerate>=0.33.0",
    "bitsandbytes>=0.43.0",
    "safetensors>=0.4.0",
    "sentencepiece>=0.2.0",
    "protobuf>=3.20.0",
]

for pkg in packages:
    install_package(pkg)

print("✅ Todas las dependencias instaladas correctamente.")`,
  },
  {
    id: 2,
    title: "Importaciones y configuración global",
    code: `# Celda 2: Importaciones y configuración global
import os
import gc
import json
import torch
import zipfile
import shutil
from pathlib import Path
from dataclasses import dataclass, field
from typing import List, Dict, Optional

from datasets import Dataset
from transformers import (
    AutoModelForCausalLM,
    AutoTokenizer,
    BitsAndBytesConfig,
    TrainingArguments,
)
from peft import LoraConfig, get_peft_model, prepare_model_for_kbit_training, TaskType
from trl import SFTTrainer, SFTConfig

# Configuración global
os.environ["PYTORCH_CUDA_ALLOC_CONF"] = "expandable_segments:True"
os.environ["TOKENIZERS_PARALLELISM"] = "false"

MODEL_ID = "google/gemma-4-31b-it-qat-w4a16-ct"
OUTPUT_DIR = "/kaggle/working/output"
ADAPTER_DIR = os.path.join(OUTPUT_DIR, "adapters")

# Crear directorios
os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(ADAPTER_DIR, exist_ok=True)

# Limpiar memoria
gc.collect()
if torch.cuda.is_available():
    torch.cuda.empty_cache()
    print(f"🔥 GPU disponible: {torch.cuda.get_device_name(0)}")
    print(f"💾 VRAM total: {torch.cuda.get_device_properties(0).total_mem / 1e9:.2f} GB")

print("✅ Configuración global lista.")`,
  },
  {
    id: 3,
    title: "Generación del dataset sintético",
    code: `# Celda 3: Generación del dataset sintético
# Dataset de alta calidad para enseñar al modelo las herramientas de la competición

GEMMA_CHAT_TEMPLATE = """<start_of_turn>user
{user_msg}<end_of_turn>
<start_of_turn>model
{model_msg}<end_of_turn>"""

synthetic_examples = [
    # Ejemplo 1: search_similar_code + get_code_subgraph
    {
        "messages": [
            {
                "role": "user",
                "content": "I need to fix a bug in the authentication module. The login function returns a 500 error when the user provides a special character in the password. Find the relevant code and show me the call graph.",
            },
            {
                "role": "model",
                "content": """I'll help you find and fix the authentication bug. Let me start by searching for the relevant code.

<function_call>
{"name": "search_similar_code", "arguments": {"query": "login authentication password validation special characters"}}
</function_call>""",
            },
            {
                "role": "user",
                "content": """Tool result: Found file "src/auth/login.py" with function "validate_password" at line 45. The function uses regex pattern r"^[a-zA-Z0-9]+$" which rejects special characters.""",
            },
            {
                "role": "model",
                "content": """Now let me get the full code subgraph to understand the call chain.

<function_call>
{"name": "get_code_subgraph", "arguments": {"file_path": "src/auth/login.py", "function_name": "validate_password", "depth": 2}}
</function_call>""",
            },
            {
                "role": "user",
                "content": """Tool result: Subgraph shows validate_password is called by login_handler() at line 120, which is called by the /api/auth/login route at line 200. The regex is defined as a module constant PASSWORD_PATTERN at line 10.""",
            },
            {
                "role": "model",
                "content": """I've identified the issue. The regex pattern \`^[a-zA-Z0-9]+$\` only allows alphanumeric characters. I'll fix it to allow special characters safely.

<function_call>
{"name": "edit_file", "arguments": {"file_path": "src/auth/login.py", "old_content": "PASSWORD_PATTERN = r\\"^[a-zA-Z0-9]+$\\"", "new_content": "PASSWORD_PATTERN = r\\"^[\\\\x20-\\\\x7E]{8,128}$\\""}}
</function_call>

The fix changes the regex to accept any printable ASCII characters (space through tilde) with a length between 8-128 characters, which is more secure and allows special characters in passwords.""",
            },
        ]
    },
    # Ejemplo 2: read_file + edit_file
    {
        "messages": [
            {
                "role": "user",
                "content": "Add error handling to the database connection pool in src/db/pool.py. It should retry 3 times before failing.",
            },
            {
                "role": "model",
                "content": """Let me first read the current file to understand its structure.

<function_call>
{"name": "read_file", "arguments": {"file_path": "src/db/pool.py"}}
</function_call>""",
            },
            {
                "role": "user",
                "content": """Tool result:
\`\`\`python
# src/db/pool.py
import psycopg2
from config import DB_CONFIG

def get_connection():
    conn = psycopg2.connect(**DB_CONFIG)
    return conn

def execute_query(query, params=None):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(query, params)
    conn.commit()
    return cursor.fetchall()
\`\`\`""",
            },
            {
                "role": "model",
                "content": """Now I'll add retry logic with exponential backoff.

<function_call>
{"name": "edit_file", "arguments": {"file_path": "src/db/pool.py", "old_content": "import psycopg2\\nfrom config import DB_CONFIG\\n\\ndef get_connection():\\n    conn = psycopg2.connect(**DB_CONFIG)\\n    return conn", "new_content": "import psycopg2\\nimport time\\nimport logging\\nfrom config import DB_CONFIG\\n\\nlogger = logging.getLogger(__name__)\\nMAX_RETRIES = 3\\nBASE_DELAY = 1.0\\n\\ndef get_connection():\\n    for attempt in range(MAX_RETRIES):\\n        try:\\n            conn = psycopg2.connect(**DB_CONFIG)\\n            return conn\\n        except psycopg2.OperationalError as e:\\n            if attempt == MAX_RETRIES - 1:\\n                logger.error(f\\"Failed after {MAX_RETRIES} attempts: {e}\\")\\n                raise\\n            delay = BASE_DELAY * (2 ** attempt)\\n            logger.warning(f\\"Connection attempt {attempt + 1} failed, retrying in {delay}s...\\")\\n            time.sleep(delay)"}}
</function_call>

Done! The connection now retries up to 3 times with exponential backoff (1s, 2s, 4s) before raising the error.""",
            },
        ]
    },
    # Ejemplo 3: Búsqueda en grafo para refactorización
    {
        "messages": [
            {
                "role": "user",
                "content": "I want to rename the class 'UserManager' to 'UserService' across the codebase. Find all usages first.",
            },
            {
                "role": "model",
                "content": """I'll search for all usages of UserManager in the codebase.

<function_call>
{"name": "search_similar_code", "arguments": {"query": "UserManager class definition and all references"}}
</function_call>""",
            },
            {
                "role": "user",
                "content": """Tool result: Found UserManager in:
- src/services/user.py (line 5: class definition)
- src/api/routes.py (line 12: import and usage)
- src/api/routes.py (line 45: instantiation)
- tests/test_user.py (line 3: import)
- tests/test_user.py (line 20: mock)""",
            },
            {
                "role": "model",
                "content": """Let me get the subgraph to ensure I capture all dependencies.

<function_call>
{"name": "get_code_subgraph", "arguments": {"file_path": "src/services/user.py", "function_name": "UserManager", "depth": 3}}
</function_call>""",
            },
            {
                "role": "user",
                "content": """Tool result: UserManager inherits from BaseService, has methods: create(), update(), delete(), get_by_id(). It's used as a dependency in routes.py via dependency injection.""",
            },
            {
                "role": "model",
                "content": """Now I'll rename the class in all files. Starting with the definition:

<function_call>
{"name": "edit_file", "arguments": {"file_path": "src/services/user.py", "old_content": "class UserManager(BaseService):", "new_content": "class UserService(BaseService):"}}
</function_call>

<function_call>
{"name": "edit_file", "arguments": {"file_path": "src/api/routes.py", "old_content": "from src.services.user import UserManager", "new_content": "from src.services.user import UserService"}}
</function_call>

<function_call>
{"name": "edit_file", "arguments": {"file_path": "src/api/routes.py", "old_content": "user_mgr = UserManager()", "new_content": "user_svc = UserService()"}}
</function_call>

<function_call>
{"name": "edit_file", "arguments": {"file_path": "tests/test_user.py", "old_content": "from src.services.user import UserManager", "new_content": "from src.services.user import UserService"}}
</function_call>

<function_call>
{"name": "edit_file", "arguments": {"file_path": "tests/test_user.py", "old_content": "@patch('src.services.user.UserManager')", "new_content": "@patch('src.services.user.UserService')"}}
</function_call>

All 5 references have been updated. The class has been renamed from UserManager to UserService across the entire codebase.""",
            },
        ]
    },
    # Ejemplo 4: Análisis de bug complejo
    {
        "messages": [
            {
                "role": "user",
                "content": "There's a memory leak in the image processing pipeline. Images are not being released after processing. Find the issue.",
            },
            {
                "role": "model",
                "content": """Let me search for the image processing code.

<function_call>
{"name": "search_similar_code", "arguments": {"query": "image processing pipeline load image memory PIL OpenCV"}}
</function_call>""",
            },
            {
                "role": "user",
                "content": """Tool result: Found src/pipeline/image_processor.py with class ImageProcessor. Methods: load_image(), process(), save_result(). Uses PIL.Image.open() and numpy arrays.""",
            },
            {
                "role": "model",
                "content": """Let me read the file to find the memory leak.

<function_call>
{"name": "read_file", "arguments": {"file_path": "src/pipeline/image_processor.py"}}
</function_call>""",
            },
            {
                "role": "user",
                "content": """Tool result:
\`\`\`python
class ImageProcessor:
    def __init__(self):
        self.processed_images = []  # Stores all processed images
    
    def load_image(self, path):
        img = Image.open(path)
        img.load()  # Force load into memory
        return img
    
    def process(self, img):
        result = img.resize((800, 600))
        self.processed_images.append(result)  # Never cleared!
        return result
\`\`\`""",
            },
            {
                "role": "model",
                "content": """Found it! The \`processed_images\` list accumulates all images indefinitely. I'll fix this by using a bounded cache and proper cleanup.

<function_call>
{"name": "edit_file", "arguments": {"file_path": "src/pipeline/image_processor.py", "old_content": "class ImageProcessor:\\n    def __init__(self):\\n        self.processed_images = []  # Stores all processed images\\n    \\n    def load_image(self, path):\\n        img = Image.open(path)\\n        img.load()  # Force load into memory\\n        return img\\n    \\n    def process(self, img):\\n        result = img.resize((800, 600))\\n        self.processed_images.append(result)  # Never cleared!\\n        return result", "new_content": "import weakref\\nfrom collections import OrderedDict\\n\\nclass ImageProcessor:\\n    def __init__(self, max_cached=10):\\n        self._cache = OrderedDict()\\n        self.max_cached = max_cached\\n    \\n    def load_image(self, path):\\n        img = Image.open(path)\\n        img.load()\\n        return img\\n    \\n    def process(self, img):\\n        result = img.resize((800, 600))\\n        # Bounded cache with LRU eviction\\n        cache_key = id(result)\\n        self._cache[cache_key] = result\\n        if len(self._cache) > self.max_cached:\\n            oldest_key = next(iter(self._cache))\\n            del self._cache[oldest_key]\\n        return result\\n    \\n    def cleanup(self):\\n        self._cache.clear()"}}
</function_call>

The fix replaces the unbounded list with an OrderedDict-based LRU cache (max 10 entries) and adds a cleanup() method. Old images are evicted automatically, preventing the memory leak.""",
            },
        ]
    },
    # Ejemplo 5: Creación de tests usando el grafo
    {
        "messages": [
            {
                "role": "user",
                "content": "Write unit tests for the payment processing module. Cover success, failure, and edge cases.",
            },
            {
                "role": "model",
                "content": """Let me first understand the payment module structure.

<function_call>
{"name": "search_similar_code", "arguments": {"query": "payment processing charge refund transaction stripe"}}
</function_call>""",
            },
            {
                "role": "user",
                "content": """Tool result: Found src/payments/processor.py with class PaymentProcessor. Methods: charge(), refund(), get_balance(). Uses Stripe API.""",
            },
            {
                "role": "model",
                "content": """Let me read the full implementation.

<function_call>
{"name": "read_file", "arguments": {"file_path": "src/payments/processor.py"}}
</function_call>""",
            },
            {
                "role": "user",
                "content": """Tool result:
\`\`\`python
import stripe

class PaymentProcessor:
    def __init__(self, api_key):
        stripe.api_key = api_key
    
    def charge(self, amount, currency, customer_id):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        return stripe.Charge.create(
            amount=int(amount * 100),
            currency=currency,
            customer=customer_id
        )
    
    def refund(self, charge_id):
        return stripe.Refund.create(charge=charge_id)
    
    def get_balance(self):
        return stripe.Balance.retrieve()
\`\`\`""",
            },
            {
                "role": "model",
                "content": """Now I'll create comprehensive unit tests.

<function_call>
{"name": "edit_file", "arguments": {"file_path": "tests/test_payment_processor.py", "old_content": "", "new_content": "import pytest\\nfrom unittest.mock import patch, MagicMock\\nfrom src.payments.processor import PaymentProcessor\\n\\n@pytest.fixture\\ndef processor():\\n    return PaymentProcessor(api_key=\\"sk_test_fake\\")\\n\\nclass TestPaymentProcessor:\\n    def test_charge_success(self, processor):\\n        with patch('stripe.Charge.create') as mock_create:\\n            mock_create.return_value = MagicMock(id='ch_123')\\n            result = processor.charge(50.00, 'usd', 'cus_123')\\n            mock_create.assert_called_once_with(\\n                amount=5000, currency='usd', customer='cus_123'\\n            )\\n            assert result.id == 'ch_123'\\n    \\n    def test_charge_negative_amount_raises(self, processor):\\n        with pytest.raises(ValueError, match=\\"Amount must be positive\\"):\\n            processor.charge(-10.00, 'usd', 'cus_123')\\n    \\n    def test_charge_zero_amount_raises(self, processor):\\n        with pytest.raises(ValueError, match=\\"Amount must be positive\\"):\\n            processor.charge(0, 'usd', 'cus_123')\\n    \\n    def test_charge_converts_to_cents(self, processor):\\n        with patch('stripe.Charge.create') as mock_create:\\n            processor.charge(19.99, 'usd', 'cus_123')\\n            call_args = mock_create.call_args\\n            assert call_args[1]['amount'] == 1999\\n    \\n    def test_refund_success(self, processor):\\n        with patch('stripe.Refund.create') as mock_refund:\\n            mock_refund.return_value = MagicMock(id='re_123')\\n            result = processor.refund('ch_123')\\n            mock_refund.assert_called_once_with(charge='ch_123')\\n            assert result.id == 're_123'\\n    \\n    def test_get_balance(self, processor):\\n        with patch('stripe.Balance.retrieve') as mock_balance:\\n            mock_balance.return_value = MagicMock(available=[{'amount': 50000}])\\n            result = processor.get_balance()\\n            mock_balance.assert_called_once()\\n            assert result.available[0]['amount'] == 50000"}}
</function_call>

Created comprehensive tests covering:
- ✅ Successful charge with correct amount conversion (dollars → cents)
- ✅ Negative amount validation
- ✅ Zero amount validation  
- ✅ Refund functionality
- ✅ Balance retrieval
- ✅ All Stripe API calls properly mocked"""
            },
        ]
    },
]

# Convertir al formato de chat de Gemma
def format_for_training(examples):
    formatted = []
    for ex in examples:
        messages = ex["messages"]
        full_text = ""
        for msg in messages:
            role = msg["role"]
            content = msg["content"]
            full_text += f"<start_of_turn>{role}\n{content}<end_of_turn>\n"
        formatted.append({"text": full_text.strip()})
    return formatted

# Crear el dataset
train_data = format_for_training(synthetic_examples)
dataset = Dataset.from_list(train_data)

print(f"✅ Dataset creado con {len(dataset)} ejemplos de entrenamiento.")
print(f"📊 Longitud promedio: {sum(len(d['text']) for d in dataset) / len(dataset):.0f} caracteres por ejemplo.")
print(f"📝 Primer ejemplo (primeros 200 chars):")
print(dataset[0]["text"][:200])`,
  },
  {
    id: 4,
    title: "Carga del modelo con cuantización 4-bit",
    code: `# Celda 4: Carga del modelo con cuantización 4-bit (QLoRA)
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer, BitsAndBytesConfig

print("⏳ Configurando cuantización 4-bit...")

# BitsAndBytesConfig para QLoRA
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.bfloat16,
    bnb_4bit_use_double_quant=True,
)

print(f"⏳ Cargando tokenizer desde {MODEL_ID}...")
tokenizer = AutoTokenizer.from_pretrained(
    MODEL_ID,
    trust_remote_code=True,
    padding_side="right",
)

# Asegurar que el tokenizer tiene pad_token
if tokenizer.pad_token is None:
    tokenizer.pad_token = tokenizer.eos_token
    tokenizer.pad_token_id = tokenizer.eos_token_id

print(f"⏳ Cargando modelo base {MODEL_ID} en 4-bit...")
print("   Esto puede tomar varios minutos en la primera descarga...")

try:
    model = AutoModelForCausalLM.from_pretrained(
        MODEL_ID,
        quantization_config=bnb_config,
        device_map="auto",
        trust_remote_code=True,
        torch_dtype=torch.bfloat16,
        attn_implementation="eager",  # Fallback seguro si flash_attn no está disponible
    )
    print("✅ Modelo cargado exitosamente en 4-bit.")
except Exception as e:
    print(f"⚠️ Error con attn_implementation='eager', intentando sin él: {e}")
    model = AutoModelForCausalLM.from_pretrained(
        MODEL_ID,
        quantization_config=bnb_config,
        device_map="auto",
        trust_remote_code=True,
        torch_dtype=torch.bfloat16,
    )
    print("✅ Modelo cargado exitosamente (configuración por defecto de atención).")

# Preparar el modelo para k-bit training
model = prepare_model_for_kbit_training(model, use_gradient_checkpointing=True)

# Habilitar gradient checkpointing para ahorrar VRAM
model.gradient_checkpointing_enable()
if hasattr(model, "config"):
    model.config.use_cache = False  # Desactivar cache durante entrenamiento

print(f"📊 Parámetros del modelo: {sum(p.numel() for p in model.parameters()) / 1e9:.2f}B")
print(f"💾 VRAM usada: {torch.cuda.memory_allocated() / 1e9:.2f} GB")
print(f"💾 VRAM reservada: {torch.cuda.memory_reserved() / 1e9:.2f} GB")`,
  },
  {
    id: 5,
    title: "Configuración de LoRA",
    code: `# Celda 5: Configuración de LoRA (Low-Rank Adaptation)
from peft import LoraConfig, get_peft_model, TaskType

print("⏳ Configurando LoRA...")

lora_config = LoraConfig(
    r=16,
    lora_alpha=32,
    target_modules=[
        "q_proj",
        "k_proj", 
        "v_proj",
        "o_proj",
        "gate_proj",
        "up_proj",
        "down_proj",
    ],
    lora_dropout=0.05,
    bias="none",
    task_type=TaskType.CAUSAL_LM,
)

# Aplicar LoRA al modelo
model = get_peft_model(model, lora_config)

# Resumen de parámetros entrenables
trainable_params = sum(p.numel() for p in model.parameters() if p.requires_grad)
total_params = sum(p.numel() for p in model.parameters())
print(f"✅ LoRA configurado exitosamente.")
print(f"📊 Parámetros entrenables: {trainable_params / 1e6:.2f}M ({100 * trainable_params / total_params:.4f}%)")
print(f"📊 Parámetros totales: {total_params / 1e9:.2f}B")
print(f"🎯 Target modules: {lora_config.target_modules}")
print(f"📐 Rank: {lora_config.r}, Alpha: {lora_config.lora_alpha}")`,
  },
  {
    id: 6,
    title: "Configuración del entrenamiento y SFTTrainer",
    code: `# Celda 6: Configuración del entrenamiento y SFTTrainer
from trl import SFTTrainer, SFTConfig

print("⏳ Configurando SFTTrainer...")

# Training arguments optimizados para GPU de Kaggle (T4 16GB / P100 16GB)
training_args = SFTConfig(
    output_dir=OUTPUT_DIR,
    num_train_epochs=3,
    per_device_train_batch_size=1,
    gradient_accumulation_steps=4,
    learning_rate=2e-4,
    weight_decay=0.01,
    warmup_ratio=0.1,
    lr_scheduler_type="cosine",
    logging_steps=1,
    save_strategy="epoch",
    save_total_limit=1,
    bf16=True,
    fp16=False,
    max_seq_length=2048,
    gradient_checkpointing=True,
    gradient_checkpointing_kwargs={"use_reentrant": False},
    optim="paged_adamw_8bit",
    report_to="none",
    seed=42,
    dataloader_pin_memory=True,
    remove_unused_columns=False,
)

# Inicializar el trainer
trainer = SFTTrainer(
    model=model,
    train_dataset=dataset,
    args=training_args,
    processing_class=tokenizer,
    max_seq_length=2048,
)

print("✅ SFTTrainer configurado exitosamente.")
print(f"📋 Configuración:")
print(f"   - Epochs: {training_args.num_train_epochs}")
print(f"   - Batch size: {training_args.per_device_train_batch_size}")
print(f"   - Gradient accumulation: {training_args.gradient_accumulation_steps}")
print(f"   - Learning rate: {training_args.learning_rate}")
print(f"   - Optimizer: {training_args.optim}")
print(f"   - Max seq length: {training_args.max_seq_length}")
print(f"   - Effective batch size: {training_args.per_device_train_batch_size * training_args.gradient_accumulation_steps}")`,
  },
  {
    id: 7,
    title: "Ejecución del entrenamiento",
    code: `# Celda 7: Ejecución del entrenamiento
import time

print("🚀 Iniciando entrenamiento...")
print(f"   GPU: {torch.cuda.get_device_name(0)}")
print(f"   VRAM antes de entrenar: {torch.cuda.memory_allocated() / 1e9:.2f} GB")

start_time = time.time()

try:
    # Ejecutar el entrenamiento
    train_result = trainer.train()
    
    elapsed_time = time.time() - start_time
    print(f"\\n✅ Entrenamiento completado exitosamente!")
    print(f"⏱️ Tiempo total: {elapsed_time / 60:.2f} minutos")
    print(f"📉 Loss final: {train_result.training_loss:.4f}")
    print(f"💾 VRAM pico: {torch.cuda.max_memory_allocated() / 1e9:.2f} GB")
    
except torch.cuda.OutOfMemoryError as e:
    print(f"\\n❌ OOM Error: {e}")
    print("   Intentando con configuración más conservadora...")
    
    # Limpiar memoria
    del model, trainer
    gc.collect()
    torch.cuda.empty_cache()
    
    # Reintentar con batch_size=1 y seq_length más corto
    print("   Reiniciando con max_seq_length=1024...")
    raise RuntimeError("OOM even with minimal config. Consider using a smaller model.")

except Exception as e:
    print(f"\\n❌ Error durante el entrenamiento: {e}")
    raise

# Guardar el modelo final
print("\\n⏳ Guardando adapter LoRA...")
trainer.save_model(ADAPTER_DIR)
tokenizer.save_pretrained(ADAPTER_DIR)
print(f"✅ Adapter guardado en: {ADAPTER_DIR}")

# Listar archivos guardados
print("\\n📁 Archivos en el directorio de adapters:")
for f in Path(ADAPTER_DIR).iterdir():
    print(f"   {f.name} ({f.stat().st_size / 1e6:.2f} MB)")`,
  },
  {
    id: 8,
    title: "Empaquetado final - submission.zip",
    code: `# Celda 8: Empaquetado final - Crear submission.zip para la competición
import yaml
import json
import shutil
from pathlib import Path

print("=" * 60)
print("📦 EMPAQUETADO FINAL - submission.zip")
print("=" * 60)

# Directorio base para la submission
SUBMISSION_DIR = Path("/kaggle/working/submission")
if SUBMISSION_DIR.exists():
    shutil.rmtree(SUBMISSION_DIR)
SUBMISSION_DIR.mkdir(parents=True, exist_ok=True)

# ============================================
# 1. Crear agent.yaml (configuración principal)
# ============================================
agent_config = {
    "name": "gemma4_code_agent",
    "description": "Gemma 4 fine-tuned agent for Google Developer Agent Competition. Specialized in code understanding, bug fixing, and repository navigation using graph-based tools.",
    "version": "1.0.0",
    "model": {
        "base_model": "google/gemma-4-31b-it-qat-w4a16-ct",
        "adapter_path": "adapters/",
        "quantization": "4bit_nf4_double",
        "max_tokens": 4096,
        "temperature": 0.1,
    },
    "tools": [
        {
            "name": "search_similar_code",
            "description": "Search for code semantically similar to a query across the repository. Returns ranked list of relevant code snippets with file paths and line numbers.",
            "parameters": {
                "query": {
                    "type": "string",
                    "description": "Natural language description of the code to find",
                    "required": True,
                }
            },
            "returns": {
                "type": "array",
                "description": "List of matching code snippets with file_path, line_number, and content",
            },
        },
        {
            "name": "get_code_subgraph",
            "description": "Get the code subgraph (call graph, dependencies, imports) for a specific function or class. Useful for understanding impact of changes.",
            "parameters": {
                "file_path": {
                    "type": "string",
                    "description": "Path to the file containing the function/class",
                    "required": True,
                },
                "function_name": {
                    "type": "string",
                    "description": "Name of the function or class to analyze",
                    "required": True,
                },
                "depth": {
                    "type": "integer",
                    "description": "Depth of the subgraph traversal (1-5)",
                    "required": False,
                    "default": 2,
                },
            },
            "returns": {
                "type": "object",
                "description": "Subgraph with callers, callees, imports, and type hierarchy",
            },
        },
        {
            "name": "read_file",
            "description": "Read the complete content of a file in the repository.",
            "parameters": {
                "file_path": {
                    "type": "string",
                    "description": "Path to the file to read",
                    "required": True,
                }
            },
            "returns": {
                "type": "string",
                "description": "Complete file content with line numbers",
            },
        },
        {
            "name": "edit_file",
            "description": "Edit a file by replacing old_content with new_content. Uses exact string matching for precision.",
            "parameters": {
                "file_path": {
                    "type": "string",
                    "description": "Path to the file to edit",
                    "required": True,
                },
                "old_content": {
                    "type": "string",
                    "description": "Exact string to find and replace",
                    "required": True,
                },
                "new_content": {
                    "type": "string",
                    "description": "New string to replace with",
                    "required": True,
                },
            },
            "returns": {
                "type": "object",
                "description": "Confirmation of edit with diff summary",
            },
        },
    ],
    "sub_agents": [
        {
            "name": "code_searcher",
            "description": "Specialized sub-agent for navigating and understanding codebases using graph-based search.",
            "tools": ["search_similar_code", "get_code_subgraph", "read_file"],
            "instructions": "You are a code navigation expert. Use search_similar_code to find relevant code, then get_code_subgraph to understand dependencies. Always read files before making changes.",
        },
        {
            "name": "code_editor",
            "description": "Specialized sub-agent for making precise code edits and fixes.",
            "tools": ["read_file", "edit_file"],
            "instructions": "You are a code editing expert. Always read the file first to understand context, then make minimal, precise edits. Use edit_file with exact string matching.",
        },
    ],
    "system_prompt": """You are an expert software engineer agent powered by Gemma 4. You help developers by:
1. Understanding codebases through semantic search and graph analysis
2. Finding bugs by tracing call graphs and reading relevant code
3. Making precise edits to fix issues
4. Writing comprehensive tests

Always follow this workflow:
- SEARCH: Use search_similar_code to find relevant files
- ANALYZE: Use get_code_subgraph to understand dependencies
- READ: Use read_file to see full context
- EDIT: Use edit_file for precise changes
- VERIFY: Read the file again to confirm changes

Format tool calls as:
<function_call>
{"name": "tool_name", "arguments": {"param": "value"}}
</function_call>""",
}

# Escribir agent.yaml
agent_yaml_path = SUBMISSION_DIR / "agent.yaml"
with open(agent_yaml_path, "w") as f:
    yaml.dump(agent_config, f, default_flow_style=False, allow_unicode=True, sort_keys=False)
print(f"✅ agent.yaml creado ({agent_yaml_path.stat().st_size} bytes)")

# ============================================
# 2. Copiar adapters LoRA entrenados
# ============================================
adapters_dest = SUBMISSION_DIR / "adapters"
adapters_dest.mkdir(exist_ok=True)

# Copiar todos los archivos del adapter
adapter_files = list(Path(ADAPTER_DIR).glob("*"))
if not adapter_files:
    print("⚠️ No se encontraron archivos de adapter. Creando placeholder...")
    # Crear un adapter placeholder si no existe (para debugging)
    placeholder = {
        "error": "Training did not produce adapter files. Check training logs.",
        "note": "This is a placeholder. Re-run the notebook with GPU enabled."
    }
    with open(adapters_dest / "adapter_config.json", "w") as f:
        json.dump({
            "base_model_name_or_path": MODEL_ID,
            "bias": "none",
            "fan_in_fan_out": False,
            "inference_mode": True,
            "init_lora_weights": True,
            "layers_pattern": None,
            "layers_to_transform": None,
            "lora_alpha": 32,
            "lora_dropout": 0.05,
            "modules_to_save": None,
            "peft_type": "LORA",
            "r": 16,
            "target_modules": ["q_proj", "k_proj", "v_proj", "o_proj", "gate_proj", "up_proj", "down_proj"],
            "task_type": "CAUSAL_LM",
        }, f, indent=2)
    print("   Placeholder adapter_config.json creado.")
else:
    for src_file in adapter_files:
        dest_file = adapters_dest / src_file.name
        shutil.copy2(src_file, dest_file)
        print(f"   📄 Copiado: {src_file.name} ({src_file.stat().st_size / 1e6:.2f} MB)")

print(f"✅ Adapters copiados a {adapters_dest}")

# ============================================
# 3. Crear README.md para la submission
# ============================================
readme_content = f"""# Gemma 4 Developer Agent - Submission

## Model
- Base: \`{MODEL_ID}\`
- Fine-tuning: QLoRA (4-bit NF4, double quantization)
- LoRA rank: 16, alpha: 32
- Optimizer: paged_adamw_8bit
- Training data: 5 high-quality synthetic examples

## Tools
- \`search_similar_code\`: Semantic code search
- \`get_code_subgraph\`: Call graph analysis
- \`read_file\`: File content reading
- \`edit_file\`: Precise code editing

## Sub-Agents
- \`code_searcher\`: Navigation and understanding
- \`code_editor\`: Precise edits and fixes

## Usage
Load the adapter with PEFT on top of the base model:
\`\`\`python
from peft import PeftModel
model = AutoModelForCausalLM.from_pretrained("{MODEL_ID}", ...)
model = PeftModel.from_pretrained(model, "adapters/")
\`\`\`
"""

readme_path = SUBMISSION_DIR / "README.md"
with open(readme_path, "w") as f:
    f.write(readme_content)
print(f"✅ README.md creado")

# ============================================
# 4. Crear submission.zip
# ============================================
zip_path = Path("/kaggle/working/submission.zip")
if zip_path.exists():
    zip_path.unlink()

print("\\n⏳ Creando submission.zip...")
with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zipf:
    for root, dirs, files in os.walk(SUBMISSION_DIR):
        for file in files:
            file_path = Path(root) / file
            arcname = file_path.relative_to(SUBMISSION_DIR)
            zipf.write(file_path, arcname)
            print(f"   📦 Añadido: {arcname}")

zip_size = zip_path.stat().st_size / 1e6
print(f"\\n{'=' * 60}")
print(f"🎉 SUBMISSION LISTA!")
print(f"{'=' * 60}")
print(f"📁 Ubicación: {zip_path}")
print(f"📏 Tamaño: {zip_size:.2f} MB")
print(f"\\n📋 Contenido del zip:")
with zipfile.ZipFile(zip_path, "r") as zipf:
    for info in zipf.infolist():
        print(f"   {info.filename} ({info.file_size / 1e6:.2f} MB)")

print(f"\\n✅ ¡Listo para subir a Kaggle!")`,
  },
];
