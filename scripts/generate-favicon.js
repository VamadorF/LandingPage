const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function generateFavicon() {
  const inputPath = path.join(__dirname, '../public/logos/eJoi_logos-01.png');
  const outputPath = path.join(__dirname, '../app/icon.png');
  
  try {
    // Crear un favicon de 32x32 con el logo centrado en 31x31 (dejando 0.5px de margen en cada lado)
    await sharp(inputPath)
      .resize(31, 31, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 } // Fondo transparente
      })
      .extend({
        top: 1,
        bottom: 0,
        left: 1,
        right: 0,
        background: { r: 0, g: 0, b: 0, alpha: 0 } // Márgenes mínimos
      })
      .png()
      .toFile(outputPath);
    
    console.log('✅ Favicon generado exitosamente en app/icon.png');
    console.log('   Tamaño: 32x32px con logo de 31x31px (márgenes mínimos)');
  } catch (error) {
    console.error('❌ Error al generar el favicon:', error);
    process.exit(1);
  }
}

generateFavicon();

