$scriptPath = Split-Path $MyInvocation.MyCommand.Path
$expectedPath = Join-Path $scriptPath "expectedOutput"
$actualPath = Join-Path $scriptPath "obj" | Join-Path -ChildPath "api"

$expected = Get-ChildItem -Path "$expectedPath" | sort-object {$_.FullName} | foreach {Get-FileHash -Path $_.FullName}
$actual = Get-ChildItem -Path "$actualPath" | sort-object {$_.FullName} | foreach {Get-FileHash -Path $_.FullName}

$diff = Compare-Object -ReferenceObject $expected -DifferenceObject $actual -PassThru -Property Hash | select -expand Path;

$message = $diff -join " != "
Write-Host $message
if ($diff.Length -gt 0) {
    throw "Result different from expected: $message"
}
