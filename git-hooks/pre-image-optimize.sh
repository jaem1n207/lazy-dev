YELLOW="\e[33m"

echo -e "${YELLOW}Running imageoptim..."
images=$(git diff --exit-code --cached --name-only --diff-filter=ACM -- '*.png' '*.jpg')

[ -z "$images" ] && exit 0
echo "$images" | imageoptim 'content/**/*.png' && git add $images