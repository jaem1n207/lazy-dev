mkdir ~/.image-opt

curl --output ~/.image-opt/imageoptim-cli.zip https://codeload.github.com/JamieMason/ImageOptim-CLI/zip/1.15.1
unzip ~/.image-opt/imageoptim-cli.zip -d ~/.image-opt/tmp
mv ~/.image-opt/tmp/ImageOptim-CLI-1.15.1 ~/.image-opt/imageoptim-cli
rm -rf ~/.image-opt/tmp

export PATH=$PATH:~/.image-opt/imageoptim-cli/bin