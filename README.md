# ⚔️ Torneo LOL App

[![Build Status](https://github.com/TU_USUARIO/App-Torneo-LOL/actions/workflows/build-android.yml/badge.svg)](https://github.com/TU_USUARIO/App-Torneo-LOL/actions)
[![Ionic](https://img.shields.io/badge/Ionic-7.2.0-blue.svg)](https://ionicframework.com)
[![Angular](https://img.shields.io/badge/Angular-19-red.svg)](https://angular.io)
[![Capacitor](https://img.shields.io/badge/Capacitor-Native-brightgreen.svg)](https://capacitorjs.com)

&gt; 🎮 Aplicación móvil híbrida para gestión de inscripciones a torneos de League of Legends.  
&gt; Desarrollada con Ionic + Angular + Capacitor.

![Logo](assets/icon/icon-only.png)

---

## 📲 Descargar la App (APK)

No necesitas compilar nada. **Descarga la última versión directamente desde GitHub Actions:**

### 📥 Opción 1: Versión Estable (Main)
1. Ve a la pestaña **[Actions](../../actions)** de este repositorio
2. Selecciona el workflow **"Build Android APK"**
3. Filtra por la rama **`main`** 
4. Click en el run más reciente ✅
5. Baja a **Artifacts** y descarga **`APK-Torneo-LOL-main`**
6. Descomprime el ZIP e instala el `.apk`

### 🧪 Opción 2: Versión Beta (Test)
¿Quieres probar las últimas funciones antes que nadie?
1. Ve a **[Actions](../../actions)**
2. Filtra por la rama **`test`**
3. Descarga **`APK-Torneo-LOL-test`**

### ⚠️ Instalación en Android
Antes de instalar el APK:
- Ve a **Ajustes &gt; Seguridad &gt; Fuentes desconocidas** y actívalo
- O al instalar el APK, selecciona **"Instalar de todos modos"** cuando aparezca el aviso de Play Protect

---

## ✨ Características Principales

- 📝 **Formulario de inscripción** validado con datos de invocador (ELO, División, Posición)
- 📧 **Notificaciones automáticas** por correo electrónico (admin + participante)
- 🎨 **Diseño gaming** inspirado en League of Legends (colores dorados y azules oscuros)
- 📱 **App Nativa Android** construida con Capacitor
- 🌐 **Web responsive** para pruebas desde cualquier navegador
- ⚡ **CI/CD automático** con GitHub Actions (compilación automática en cada push)

---

## 🛠️ Stack Tecnológico

| Tecnología | Versión | Uso |
|------------|---------|-----|
| **Ionic Framework** | 7.x | UI/UX Framework |
| **Angular** | 19.x | Frontend Framework |
| **Capacitor** | 7.x | Bridge nativo para Android/iOS |
| **TypeScript** | 5.6 | Lenguaje principal |
| **PHP** | 8.x | Backend API REST |
| **SendGrid/Mail** | - | Envío de correos electrónicos |

---

## 🚀 Desarrollo Local

¿Quieres modificar o mejorar la app? Sigue estos pasos:

### Pre-requisitos
- Node.js v18+
- npm o yarn
- Android Studio (para compilar APK)
- Git

### Instalación rápida

```bash
# 1. Clonar repositorio
git clone https://github.com/TU_USUARIO/App-Torneo-LOL.git
cd App-Torneo-LOL

# 2. Instalar dependencias
npm install --legacy-peer-deps

# 3. Servir en modo desarrollo (localhost:8100)
ionic serve

# 4. Para compilar APK nativa (Android)
ionic build --prod
npx cap sync android
npx cap open android

Estructura del proyecto

src/
├── app/
│   ├── inscripcion/     # Página de formulario
│   ├── home/            # Página principal  
│   └── services/        # EmailService, etc.
├── assets/              # Iconos, imágenes, fuentes
└── environments/        # Configuraciones

🤝 Contribuciones

¡Las contribuciones son bienvenidas!

    Haz Fork del proyecto
    Crea una rama: git checkout -b feature/nueva-funcion
    Commitea cambios: git commit -m 'Agregada nueva función'
    Push: git push origin feature/nueva-funcion
    Abre un Pull Request

👨‍💻 Autor
Desarrollado por: Mario Melendez P.
Contacto: mariomelendezpichoneau@gmail.com
Versión actual: 1.0.0

<p align="center">
  <b>🎮 ¡Nos vemos en la Grieta del Invocador! ⚔️</b>
</p>
```