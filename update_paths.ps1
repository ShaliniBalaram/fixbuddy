$files = Get-ChildItem -Path "pages" -Filter "*.html"
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $content = $content -replace 'href="styles/', 'href="../styles/'
    $content = $content -replace 'href="js/', 'href="../js/'
    $content = $content -replace 'src="js/', 'src="../js/'
    Set-Content $file.FullName $content
}
