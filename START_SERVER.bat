@echo off
echo ========================================
echo   Demarrage du serveur local
echo ========================================
echo.
echo Tentative avec Python 3...
python -m http.server 8000 2>nul
if %errorlevel% neq 0 (
    echo Python 3 non trouve. Tentative avec Python 2...
    python -m SimpleHTTPServer 8000 2>nul
    if %errorlevel% neq 0 (
        echo.
        echo ERREUR: Python n'est pas installe sur votre systeme.
        echo.
        echo Veuillez installer Python depuis https://www.python.org/downloads/
        echo OU utiliser une autre methode pour demarrer un serveur local.
        echo.
        pause
    )
)

