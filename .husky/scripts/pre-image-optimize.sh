yellow='\033[1;33m'
no_color='\033[0m'

images=$(git diff --cached --name-only --diff-filter=ACM -- '*.png' '*.jpg' '*.jpeg')

[ -z "$images" ] && exit 0
echo "$images" | imageoptim 'content/**/*.png' 'content/**/*.jpg' 'content/**/*.jpeg' && git add $images