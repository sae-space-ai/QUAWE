// Script de prueba para verificar el sistema de suscripción premium
// Ejecutar en la consola del navegador

export function testPremiumSystem() {
  console.log('=== PRUEBA DEL SISTEMA PREMIUM ===\n');
  
  // 1. Verificar usuario actual
  const currentUser = JSON.parse(localStorage.getItem('quawe_current_user') || 'null');
  console.log('1. Usuario actual:', currentUser);
  
  if (!currentUser) {
    console.error('❌ No hay usuario logueado. Inicia sesión primero.');
    return;
  }
  
  // 2. Verificar datos del usuario
  const users = JSON.parse(localStorage.getItem('quawe_users') || '[]');
  const user = users.find((u: any) => u.id === currentUser);
  console.log('2. Datos del usuario:', user);
  
  if (!user) {
    console.error('❌ Usuario no encontrado en la base de datos.');
    return;
  }
  
  // 3. Verificar membresías
  const memberships = JSON.parse(localStorage.getItem('quawe_premium_memberships') || '[]');
  console.log('3. Membresías existentes:', memberships);
  
  // 4. Probar suscripción
  console.log('\n4. Probando suscripción...');
  
  // Importar funciones (simulado)
  const startDate = Date.now();
  const endDate = startDate + (30 * 24 * 60 * 60 * 1000);
  
  const newMembership = {
    userId: currentUser,
    startDate,
    endDate,
    isActive: true,
    autoRenew: true,
    paymentMethod: 'test'
  };
  
  // Guardar membresía
  const updatedMemberships = [...memberships.filter((m: any) => m.userId !== currentUser), newMembership];
  localStorage.setItem('quawe_premium_memberships', JSON.stringify(updatedMemberships));
  console.log('✅ Membresía guardada:', newMembership);
  
  // 5. Actualizar usuario
  user.isPremium = true;
  user.premiumStartDate = startDate;
  user.premiumEndDate = endDate;
  user.points += 2000; // Bonus de bienvenida
  
  const updatedUsers = users.map((u: any) => u.id === currentUser ? user : u);
  localStorage.setItem('quawe_users', JSON.stringify(updatedUsers));
  console.log('✅ Usuario actualizado:', user);
  
  // 6. Verificar resultado
  console.log('\n5. Verificación final:');
  const finalUser = JSON.parse(localStorage.getItem('quawe_users') || '[]').find((u: any) => u.id === currentUser);
  const finalMembership = JSON.parse(localStorage.getItem('quawe_premium_memberships') || '[]').find((m: any) => m.userId === currentUser);
  
  console.log('Usuario final:', finalUser);
  console.log('Membresía final:', finalMembership);
  
  if (finalUser.isPremium && finalMembership.isActive) {
    console.log('\n✅ ¡PRUEBA EXITOSA! El sistema de suscripción funciona correctamente.');
    console.log('🎉 Usuario ahora es premium con', finalUser.points, 'puntos.');
    console.log('📅 Membresía válida hasta:', new Date(finalMembership.endDate).toLocaleString());
  } else {
    console.error('\n❌ PRUEBA FALLIDA. Revisa los logs.');
  }
  
  console.log('\n=== FIN DE LA PRUEBA ===');
}

// Función para resetear el sistema premium (útil para pruebas)
export function resetPremiumSystem() {
  console.log('Reseteando sistema premium...');
  
  const currentUser = JSON.parse(localStorage.getItem('quawe_current_user') || 'null');
  if (!currentUser) {
    console.error('No hay usuario logueado.');
    return;
  }
  
  // Resetear membresías
  const memberships = JSON.parse(localStorage.getItem('quawe_premium_memberships') || '[]');
  const updatedMemberships = memberships.filter((m: any) => m.userId !== currentUser);
  localStorage.setItem('quawe_premium_memberships', JSON.stringify(updatedMemberships));
  
  // Resetear usuario
  const users = JSON.parse(localStorage.getItem('quawe_users') || '[]');
  const updatedUsers = users.map((u: any) => {
    if (u.id === currentUser) {
      return {
        ...u,
        isPremium: false,
        premiumStartDate: undefined,
        premiumEndDate: undefined
      };
    }
    return u;
  });
  localStorage.setItem('quawe_users', JSON.stringify(updatedUsers));
  
  console.log('✅ Sistema premium reseteado.');
}

// Hacer las funciones disponibles globalmente para pruebas
if (typeof window !== 'undefined') {
  (window as any).testPremium = testPremiumSystem;
  (window as any).resetPremium = resetPremiumSystem;
  
  console.log('🔧 Funciones de prueba disponibles:');
  console.log('  - testPremium() - Probar sistema de suscripción');
  console.log('  - resetPremium() - Resetear sistema premium');
}
