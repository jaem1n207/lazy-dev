'use strict';

const path = require('path');

const dayjs = require('dayjs');
const fs = require('fs-extra');
const matter = require('gray-matter');
const inquirer = require('inquirer');
const recursive = require('recursive-readdir');

const { makeCustomSignale, makeInteractiveSignale } = require('./log.cjs');

const log = makeCustomSignale();
const interactiveLog = makeInteractiveSignale();

const BLOG_DIR_PATH = path.join(process.cwd(), 'content', 'blog');
const THUMBNAIL_TARGET_DIR = path.join(BLOG_DIR_PATH, 'thumbnails');
const IGNORE_DIR = 'images';
const AUTHOR_ID = 'jaemin';
const CUSTOM_CATEGORY_OPTIONS = ['[ CREATE NEW CATEGORY ]', '[ CANCEL ]'];

/**
 *
 * @param {string} title
 * @returns {string} replaced title
 */
const getFileName = (title) => title.trim().toLowerCase().replace(/ /g, '-'); // replace space to dash

/**
 *
 * @param {string} file
 * @param {fs.Stats} stats
 * @returns {boolean} object returned from `fs.lstat()`
 */
const ignoreFunc = (file, stats) => stats.isDirectory() && path.basename(file) === IGNORE_DIR;

const uniq = (arr) => [...new Set(arr)];

/**
 *
 * @param {string} targetDir
 * @returns {Promise<string[]>} categories
 */
const getCategory = async (targetDir) => {
  const markdownFiles = await recursive(targetDir, [ignoreFunc]);

  return uniq(
    markdownFiles
      .map((file) => {
        const content = fs.readFileSync(file, 'utf8');
        const { data } = matter(content);

        return data.category;
      })
      .filter((category) => !!category)
      .map((category) => category.trim().toLowerCase()),
  );
};

/**
 *
 * @param {string} targetDir
 * @returns {string[]} files in the target directory
 */
const getFilesOfDir = (targetDir) => fs.readdirSync(targetDir);

const isNil = (value) => {
  return value === null || value === undefined;
};

const isEmptyString = (value) => {
  return isNil(value) || value?.toString().trim() === '';
};

/**
 * @name validateSpecialSymbol
 * @description Validate that the input does not contain special symbols
 *
 * @example
 * validateSpecialSymbol('hello') // true
 * validateSpecialSymbol('hello!') // '태그에는 특수문자를 사용할 수 없어요'
 *
 * @param {string} input
 * @returns {boolean|string} If the input contains special symbols, return a string. Otherwise, return true.
 */
const validateSpecialSymbol = (input) => {
  const specialSymbolRegex = /[~!@#$%^&*()_+|<>?:{}]/;
  const hasSpecialSymbol = specialSymbolRegex.test(input);
  if (hasSpecialSymbol) {
    return '태그에는 특수문자를 사용할 수 없어요';
  }

  return true;
};

const getContentsInquirer = async () => {
  const categories = await getCategory(BLOG_DIR_PATH);
  const categoryInquirer = [
    {
      type: 'list',
      name: 'selectedCategory',
      message: '카테고리 선택: ',
      choices: [...CUSTOM_CATEGORY_OPTIONS, new inquirer.Separator(), ...categories],
    },
  ];

  const folderNameRegex = /^(\w+\.?)*\w+$/;
  const newCategoryInquirer = [
    {
      type: 'input',
      name: 'newCategory',
      message: '새 카테고리 입력: ',
      validate: (input) => {
        if (isEmptyString(input)) {
          return '새 카테고리를 입력해주세요';
        }

        if (categories.includes(input.toLowerCase())) {
          return `${input} 카테고리는 이미 존재해요. 다른 이름을 입력해주세요`;
        }

        if (input.length < 2) {
          return '카테고리 이름이 너무 짧아요. 최소 2자 이상이어야 해요';
        }

        if (!folderNameRegex.test(input)) {
          return '카테고리 이름으로 포함할 수 없는 문자가 있어요. 영문, 숫자, ., _ 만 사용할 수 있어요';
        }

        return true;
      },
    },
  ];

  /**
   * @param {string} category To verify that the title you entered exists in the selected category
   */
  const titleInquirer = (category) => {
    return [
      {
        type: 'input',
        name: 'title',
        message: '제목 입력: ',
        validate: (input) => {
          if (isEmptyString(input)) {
            return '제목을 입력해주세요';
          }

          if (input.includes("'")) {
            return '제목에는 작은 따옴표를 사용할 수 없어요';
          }

          const fileName = getFileName(input);
          const isExist = fs.pathExistsSync(path.join(BLOG_DIR_PATH, category, `${fileName}.md`));
          if (isExist) {
            return `${input} 제목은 이미 ${category} 카테고리에 존재해요. 다른 제목을 입력해주세요`;
          }

          return true;
        },
      },
    ];
  };

  const tagInquirer = [
    {
      type: 'input',
      name: 'tag',
      message: '태그 입력 (태그 입력을 끝내려면 빈 문자열을 입력해주세요 - 최대 10개): ',
      validate: (input) => {
        if (isEmptyString(input)) {
          return true;
        }

        const isSpecialSymbol = validateSpecialSymbol(input);
        if (isSpecialSymbol !== true) {
          return isSpecialSymbol;
        }

        return true;
      },
    },
  ];

  const keywordInquirer = [
    {
      type: 'input',
      name: 'keyword',
      message: '키워드 입력 (키워드 입력을 끝내려면 빈 문자열을 입력해주세요 - 최대 10개): ',
      validate: (input) => {
        if (isEmptyString(input)) {
          return true;
        }

        const isSpecialSymbol = validateSpecialSymbol(input);
        if (isSpecialSymbol !== true) {
          return isSpecialSymbol;
        }

        return true;
      },
    },
  ];

  const thumbnails = getFilesOfDir(THUMBNAIL_TARGET_DIR);
  const thumbnailInquirer = [
    {
      type: 'list',
      name: 'selectedThumbnail',
      message: '썸네일 선택: ',
      choices: [...thumbnails],
    },
  ];

  const summaryInquirer = [
    {
      type: 'input',
      name: 'summary',
      message: '요약 입력: ',
      validate: (input) => {
        if (isEmptyString(input)) {
          return '요약을 입력해주세요';
        }

        return true;
      },
    },
  ];

  return {
    categoryInquirer: {
      selected: categoryInquirer,
      new: newCategoryInquirer,
    },
    titleInquirer,
    tagInquirer,
    keywordInquirer,
    thumbnailInquirer,
    summaryInquirer,
  };
};

const promptContents = async () => {
  const contentsInquirer = await getContentsInquirer();

  let step = 1;
  let totalSteps = Object.keys(contentsInquirer).length;

  interactiveLog.await(`[%d/%d] - 카테고리를 선택하는 중이예요...`, step, totalSteps);
  let category = null;
  const { selectedCategory } = await inquirer.prompt(contentsInquirer.categoryInquirer.selected);
  if (selectedCategory === CUSTOM_CATEGORY_OPTIONS[0]) {
    const { newCategory } = await inquirer.prompt(contentsInquirer.categoryInquirer.new);
    category = newCategory.toLowerCase();
  } else if (selectedCategory === CUSTOM_CATEGORY_OPTIONS[1]) {
    interactiveLog.error(`[%d/%d] - 카테고리 선택이 취소되었어요`, step, totalSteps);
    process.exit(0);
  }
  const categoryValue = category || selectedCategory;
  step++;

  interactiveLog.await(`[%d/%d] - 제목을 입력하는 중이예요...`, step, totalSteps);
  const { title } = await inquirer.prompt(contentsInquirer.titleInquirer(categoryValue));
  step++;

  interactiveLog.await(`[%d/%d] - 태그를 입력하는 중이예요...`, step, totalSteps);
  const tags = [];
  const maxTagCount = 10;
  for (let i = 0; i < maxTagCount; i++) {
    const { tag } = await inquirer.prompt(contentsInquirer.tagInquirer);
    if (isEmptyString(tag)) {
      break;
    }

    tags.push(tag);
  }
  step++;

  interactiveLog.await(`[%d/%d] - 키워드를 입력하는 중이예요...`, step, totalSteps);
  const keywords = [];
  const maxKeywordCount = 10;
  for (let i = 0; i < maxKeywordCount; i++) {
    const { tag } = await inquirer.prompt(contentsInquirer.keywordInquirer);
    if (isEmptyString(tag)) {
      break;
    }

    keywords.push(tag);
  }
  step++;

  interactiveLog.await(`[%d/%d] - 썸네일을 선택하는 중이예요...`, step, totalSteps);
  let thumbnail = null;
  const { selectedThumbnail } = await inquirer.prompt(contentsInquirer.thumbnailInquirer);
  thumbnail = path.relative(BLOG_DIR_PATH, path.join(THUMBNAIL_TARGET_DIR, selectedThumbnail));
  thumbnail = `../${thumbnail}`;
  step++;

  interactiveLog.await(`[%d/%d] - 요약을 입력하는 중이예요...`, step, totalSteps);
  const { summary } = await inquirer.prompt(contentsInquirer.summaryInquirer);
  step++;

  return {
    category: categoryValue,
    title,
    tags,
    keywords,
    thumbnail,
    summary,
  };
};

/**
 *
 * @param {object} rawContents
 * @param {string} rawContents.title
 * @param {string} rawContents.date
 * @param {string} rawContents.category
 * @param {string} rawContents.tags
 * @param {string} rawContents.authorId
 * @param {string} rawContents.thumbnail
 * @param {string} rawContents.summary
 * @returns {string} refined contents
 */
const refineContents = (rawContents) =>
  matter.stringify('', rawContents).split("'").join('"').replace(/\\n/g, ' '); // replace single quote to double quote

module.exports = (async function () {
  console.log(''); // empty line

  const { category, title, tags, keywords, thumbnail, summary } = await promptContents();
  const date = dayjs().format('YYYY-MM-DD HH:mm:ss');
  const fileName = getFileName(title);

  const destDir = path.join(BLOG_DIR_PATH, category);
  const destDirExists = await fs.pathExists(destDir);

  if (!destDirExists) {
    await fs.mkdirp(destDir);
  }

  const contents = refineContents({
    title,
    date,
    category,
    tags,
    keywords,
    authorId: AUTHOR_ID,
    thumbnail,
    summary,
  });

  fs.writeFile(path.join(destDir, `${fileName}.md`), contents, (err) => {
    if (err) {
      log.error('예상치 못한 에러: 새 글 생성에 실패했습니다');
    }

    log.complete('\n');
    log.rocket(`새 글이 생성되었습니다!`);
    log.path(`${path.join(destDir, `${fileName}.md`)}`);
    log.contents(`\n\n${contents}`);
    log.santa();
  });
})().catch((err) => {
  log.error(`예상치 못한 에러: ${err.message}`);
  process.exit(1);
});
