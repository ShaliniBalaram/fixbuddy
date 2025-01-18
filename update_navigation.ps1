$files = Get-ChildItem -Path . -Filter "*.html" -Recurse

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    # Update category buttons with titles
    $content = $content -replace '<button class="category-btn">\s*<i class="fas fa-wrench"></i>\s*Plumbing', '<button class="category-btn" title="Learn how to fix common plumbing issues like leaky faucets, clogged drains, and toilet problems"><i class="fas fa-wrench"></i>Plumbing'
    $content = $content -replace '<button class="category-btn">\s*<i class="fas fa-plug"></i>\s*Electrical', '<button class="category-btn" title="Learn how to safely handle electrical repairs around your home"><i class="fas fa-plug"></i>Electrical'
    $content = $content -replace '<button class="category-btn">\s*<i class="fas fa-couch"></i>\s*Furniture', '<button class="category-btn" title="Learn how to repair and maintain your furniture"><i class="fas fa-couch"></i>Furniture'
    $content = $content -replace '<button class="category-btn">\s*<i class="fas fa-door-open"></i>\s*Doors \& Windows', '<button class="category-btn" title="Learn how to fix common door and window problems"><i class="fas fa-door-open"></i>Doors & Windows'
    $content = $content -replace '<button class="category-btn">\s*<i class="fas fa-tools"></i>\s*Appliances', '<button class="category-btn" title="Learn how to troubleshoot and fix household appliances"><i class="fas fa-tools"></i>Appliances'
    
    # Update individual links with titles
    $content = $content -replace '<a href="[^"]*leaky-faucet.html">Leaky Faucet</a>', '<a href="../plumbing/leaky-faucet.html" title="Fix dripping faucets and replace washers">Leaky Faucet</a>'
    $content = $content -replace '<a href="[^"]*clogged-drain.html">Clogged Drain</a>', '<a href="../plumbing/clogged-drain.html" title="Clear blocked drains and prevent future clogs">Clogged Drain</a>'
    $content = $content -replace '<a href="[^"]*running-toilet.html">Running Toilet</a>', '<a href="../plumbing/running-toilet.html" title="Stop toilet from running and fix flush mechanisms">Running Toilet</a>'
    
    $content = $content -replace '<a href="[^"]*light-switch.html">Light Switch Issues</a>', '<a href="../electrical/light-switch.html" title="Repair faulty switches and fix flickering lights">Light Switch Issues</a>'
    $content = $content -replace '<a href="[^"]*outlet-repair.html">Outlet Not Working</a>', '<a href="../electrical/outlet-repair.html" title="Fix dead outlets and replace damaged receptacles">Outlet Not Working</a>'
    $content = $content -replace '<a href="[^"]*ceiling-fan.html">Ceiling Fan Problems</a>', '<a href="../electrical/ceiling-fan.html" title="Repair wobbly fans and fix speed controls">Ceiling Fan Problems</a>'
    
    $content = $content -replace '<a href="[^"]*wobbly-table.html">Wobbly Table/Chair</a>', '<a href="../furniture/wobbly-table.html" title="Stabilize wobbly furniture and fix loose legs">Wobbly Table/Chair</a>'
    $content = $content -replace '<a href="[^"]*drawer-repair.html">Stuck Drawer</a>', '<a href="../furniture/drawer-repair.html" title="Fix stuck drawers and repair drawer slides">Stuck Drawer</a>'
    $content = $content -replace '<a href="[^"]*cabinet-hinge.html">Cabinet Hinge</a>', '<a href="../furniture/cabinet-hinge.html" title="Repair loose hinges and align cabinet doors">Cabinet Hinge</a>'
    
    $content = $content -replace '<a href="[^"]*squeaky-hinge.html">Squeaky Hinge</a>', '<a href="../doors/squeaky-hinge.html" title="Silence squeaky hinges and lubricate door parts">Squeaky Hinge</a>'
    $content = $content -replace '<a href="[^"]*stuck-window.html">Stuck Window</a>', '<a href="../doors/stuck-window.html" title="Unstick windows and fix window tracks">Stuck Window</a>'
    $content = $content -replace '<a href="[^"]*door-lock.html">Door Lock Issues</a>', '<a href="../doors/door-lock.html" title="Repair faulty locks and fix alignment issues">Door Lock Issues</a>'
    
    $content = $content -replace '<a href="[^"]*washer-repair.html">Washer Problems</a>', '<a href="washer-repair.html" title="Fix common washing machine problems and maintenance">Washer Problems</a>'
    $content = $content -replace '<a href="[^"]*dryer-repair.html">Dryer Not Working</a>', '<a href="dryer-repair.html" title="Repair dryer issues and improve performance">Dryer Not Working</a>'
    $content = $content -replace '<a href="[^"]*dishwasher.html">Dishwasher Issues</a>', '<a href="dishwasher.html" title="Troubleshoot and fix dishwasher problems">Dishwasher Issues</a>'
    
    Set-Content $file.FullName $content
}

Write-Host "Navigation updated in all HTML files."
