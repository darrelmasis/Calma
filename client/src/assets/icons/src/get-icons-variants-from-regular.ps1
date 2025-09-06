# Definir rutas de las carpetas
$src = "C:\Users\ADATOS\OneDrive - MONISA\Escritorio\DM\Proyectos\Calma\client\src\assets\icons\src\regular"
$target = "C:\Users\ADATOS\OneDrive - MONISA\Recursos\svgs\duotone-regular"
$dest = "C:\Users\ADATOS\OneDrive - MONISA\Escritorio\DM\Proyectos\Calma\client\src\assets\icons\src\duotones\regular"

# Crear la carpeta destino si no existe
if (-not (Test-Path -Path $dest)) {
    New-Item -ItemType Directory -Path $dest
}

# Obtener todos los archivos de la carpeta fuente
$srcFiles = Get-ChildItem -Path $src -File

foreach ($file in $srcFiles) {
    # Buscar el archivo con el mismo nombre en la carpeta target
    $targetFile = Get-ChildItem -Path $target -File -Filter $file.Name

    if ($targetFile) {
        # Copiar el archivo encontrado a la carpeta destino
        Copy-Item -Path $targetFile.FullName -Destination $dest -Force
        Write-Output "Copiado: $($targetFile.Name)"
    } else {
        Write-Output "No encontrado en target: $($file.Name)"
    }
}
