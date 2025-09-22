# Carpeta fuente (siempre la misma)
$src = "C:\Users\ADATOS\OneDrive - MONISA\Carpeta personal\Proyectos\Calma\client\src\assets\icons\src\regular"

# Lista de destinos con su respectivo target
$routes = @(
    @{
        target = "C:\Users\ADATOS\OneDrive - MONISA\Recursos\svgs\duotone-regular"
        dest   = "C:\Users\ADATOS\OneDrive - MONISA\Carpeta personal\Proyectos\Calma\client\src\assets\icons\src\duotones\regular"
    },
    @{
        target = "C:\Users\ADATOS\OneDrive - MONISA\Recursos\svgs\duotone"
        dest   = "C:\Users\ADATOS\OneDrive - MONISA\Carpeta personal\Proyectos\Calma\client\src\assets\icons\src\duotones\solid"
    }

    @{
        target = "C:\Users\ADATOS\OneDrive - MONISA\Recursos\svgs\solid"
        dest   = "C:\Users\ADATOS\OneDrive - MONISA\Carpeta personal\Proyectos\Calma\client\src\assets\icons\src\solid"
    }
    # 👉 Aquí puedes seguir agregando más pares target/dest
)

# Obtener todos los archivos de la carpeta fuente (una sola vez)
$srcFiles = Get-ChildItem -Path $src -File

foreach ($route in $routes) {
    $target = $route.target
    $dest   = $route.dest

    # Crear carpeta destino si no existe
    if (-not (Test-Path -Path $dest)) {
        New-Item -ItemType Directory -Path $dest | Out-Null
    }

    foreach ($file in $srcFiles) {
        # Buscar el archivo con el mismo nombre en la carpeta target
        $targetFile = Get-ChildItem -Path $target -File -Filter $file.Name

        if ($targetFile) {
            # Copiar el archivo encontrado a la carpeta destino
            Copy-Item -Path $targetFile.FullName -Destination $dest -Force
            Write-Output "Copiado: $($targetFile.Name) → $dest"
        } else {
            Write-Output "No encontrado en target: $($file.Name)"
        }
    }
}
