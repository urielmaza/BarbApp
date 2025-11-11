@echo off
echo ===========================
echo Iniciando BarbApp...
echo ===========================

REM Backend
echo [BACKEND] Iniciando...
cd backend
call npm install
start /B cmd /c "npm run dev"
cd ..

REM Frontend
echo [FRONTEND] Iniciando...
cd frontend
call npm install
start /B cmd /c "npm run dev"
cd ..

echo ===========================
echo BarbApp se está ejecutando
echo ===========================
