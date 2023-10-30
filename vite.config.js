// vite.config.js
export default {
    // Otras configuraciones de VITE que puedas tener...
  
    build: {
      rollupOptions: {
        input: {
          main: 'main.js', // Ruta al archivo de entrada principal de tu aplicación
          reticulas: 'reticulas.html', // Ruta al archivo reticulas.html
          index: 'index.html' // Ruta al archivo reticulas.html
        },
      }
    }
  };
  