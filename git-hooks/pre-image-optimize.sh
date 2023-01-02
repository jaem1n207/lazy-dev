yellow='\033[1;33m'
no_color='\033[0m'

echo "\n${yellow}Running imageoptim...${no_color}\n"
images=$(git diff --cached --name-only --diff-filter=ACM -- '*.png' '*.jpg')

[ -z "$images" ] && exit 0
echo "$images" | imageoptim 'content/**/*.png' && git add $images