# Politica de Seguridad y Divulgacion Responsable

La seguridad de la informacion de los estudiantes, docentes y procesos administrativos de la Universidad Nacional Amazonica de Madre de Dios (UNAMAD) es una prioridad absoluta en OpenMad.

---

## 1. Reporte de Vulnerabilidades

Si descubres una vulnerabilidad de seguridad en cualquier aplicacion o servicio de este repositorio, por favor **NO abras un Issue publico**.

Los reportes de seguridad deben gestionarse de manera privada y confidencial:

1. **GitHub Security Advisory (Recomendado):**
   Ve a la pestaña [Security > Advisories](https://github.com/yohanvillarp/openmad/security/advisories/new) en GitHub y abre un reporte privado.
2. **Correo Electronico:**
   Puedes contactar al mantenedor principal directamente a: `yohannikel21@gmail.com` indicando en el asunto: `[VULNERABILIDAD-OPENMAD]`.

Por favor incluye en tu reporte:
- Descripcion detallada del fallo detectado.
- Pasos precisos o script de reproduccion (Proof of Concept).
- Impacto estimado (e.g. acceso no autorizado, fuga de datos personales, elevacion de privilegios).

---

## 2. Politica de Cero Secretos en Repositorio

- Nunca se deben comitear credenciales, variables de entorno reales (`.env`), llaves privadas (`.pem`, `.key`) ni tokens de API.
- El proyecto cuenta con escaneos automatizados con **Gitleaks** y revisiones con **CodeQL**.
- Toda credencial detectada en el historial de commits sera revocada de inmediato.

---

## 3. Compromiso de Respuesta

- **Confirmacion inicial:** Recibiras una respuesta acusando recibo dentro de las primeras 48 horas habiles.
- **Evaluacion y parche:** Evaluaremos la severidad del reporte y prepararemos un parche correctivo en una rama privada antes de publicarlo.
- **Agradecimiento:** Salvo que solicites anonimato, se otorgara reconocimiento formal en las notas de la release de seguridad.
