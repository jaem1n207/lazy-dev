'use strict';

const dayjs = require('dayjs');
const fs = require('fs-extra');
const matter = require('gray-matter');
const inquirer = require('inquirer');
const path = require('path');
const recursive = require('recursive-readdir');

const { makeCustomSignale, makeInteractiveSignale } = require('./log');

const log = makeCustomSignale();
const interactiveLog = makeInteractiveSignale();

const BLOG_DIR_PATH = path.join(process.cwd(), 'content', 'blog');
const IGNORE_DIR = 'images';
const AUTHOR_ID = 'jaemin';

let step = 1;
const totalStep = 4;

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
 * @param {string} title
 * @returns {string} replaced title
 */
const getFileName = (title) => title.trim().toLowerCase().replace(/ /g, '-'); // replace space to dash

/**
 *
 * @param {object} rawContents
 * @param {string} rawContents.title
 * @param {string} rawContents.date
 * @param {string} rawContents.category
 * @param {string} rawContents.thumbnail
 * @param {string} rawContents.summary
 * @returns {string} refined contents
 */
const refineContents = (rawContents) =>
  matter.stringify('', rawContents).split("'").join('"').replace(/\\n/g, ' '); // replace single quote to double quote

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
      .map((category) => category.trim().toLowerCase())
  );
};

/**
 *
 * @param {string} targetDir
 * @returns {Promise<string>} category
 */
const fetchCategory = async (targetDir) => {
  const folderNameRegex = /^(\w+\.?)*\w+$/;

  let category = null;
  const customCategoryOptions = ['[ CREATE NEW CATEGORY ]', '[ CANCEL ]'];

  const categories = await getCategory(targetDir);

  interactiveLog.await(`[%d/%d] - 카테고리를 선택하는 중...`, step, totalStep);
  const categoryInquirer = [
    {
      type: 'list',
      name: 'selectedCategory',
      message: '카테고리 선택: ',
      choices: [...categories, new inquirer.Separator(), ...customCategoryOptions],
    },
  ];

  const { selectedCategory } = await inquirer.prompt(categoryInquirer);

  if (selectedCategory === customCategoryOptions[0]) {
    const { newCategory } = await inquirer.prompt([
      {
        type: 'input',
        name: 'newCategory',
        message: '새 카테고리 입력: ',
        validate: (input) => {
          if (!input) {
            return '새 카테고리를 입력해주세요';
          }

          if (categories.includes(input.toLowerCase())) {
            return `${input} 카테고리는 이미 존재합니다. 다른 이름을 입력해주세요`;
          }

          if (input.length < 2) {
            return '카테고리 이름이 너무 짧습니다. 최소 2자 이상이어야 합니다';
          }

          if (!folderNameRegex.test(input)) {
            return '카테고리 이름이 잘못되었습니다. 영문, 숫자, ., _ 만 사용할 수 있습니다';
          }

          return true;
        },
      },
    ]);

    category = newCategory;
  } else if (selectedCategory === customCategoryOptions[1]) {
    interactiveLog.error(`[%d/%d] - 카테고리 선택이 취소되었습니다`, step, totalStep);
    process.exit(0);
  }

  step++;

  return category || selectedCategory;
};

/**
 *
 * @param {string} targetDir
 * @param {string} category
 * @returns {Promise<string>} title
 */
const fetchTitle = async (targetDir, category) => {
  interactiveLog.await(`[%d/%d] - 제목을 입력하는 중...`, step, totalStep);
  const titleInquirer = [
    {
      type: 'input',
      name: 'title',
      message: '제목 입력: ',
      validate: async (input) => {
        if (!input) {
          return '제목을 입력해주세요';
        }

        if (input.includes("'")) {
          return '제목에는 작은 따옴표를 사용할 수 없습니다';
        }

        const fileName = getFileName(input);
        const isExist = await fs.pathExists(path.join(targetDir, category, `${fileName}.md`));

        if (isExist) {
          return `${input} 제목은 이미 ${category} 카테고리에 존재합니다. 다른 제목을 입력해주세요`;
        }

        return true;
      },
    },
  ];

  const { title } = await inquirer.prompt(titleInquirer);

  step++;

  return title;
};

/**
 *
 * @param {string} targetDir
 * @returns {string[]} files in the target directory
 */
const getFilesOfDir = (targetDir) => fs.readdirSync(targetDir);

/**
 *
 * @param {string} targetDir
 * @returns {Promise<string>} thumbnail
 */
const fetchThumbnail = async (targetDir) => {
  interactiveLog.await(`[%d/%d] - 썸네일을 입력하는 중...`, step, totalStep);

  let thumbnail = null;
  const thumbnails = getFilesOfDir(targetDir);

  const thumbnailInquirer = [
    {
      type: 'list',
      name: 'selectedThumbnail',
      message: '썸네일 선택: ',
      choices: [...thumbnails],
    },
  ];

  const { selectedThumbnail } = await inquirer.prompt(thumbnailInquirer);

  thumbnail = path.relative(BLOG_DIR_PATH, path.join(targetDir, selectedThumbnail));
  thumbnail = `../${thumbnail}`;

  step += 1;

  return thumbnail;
};

const fetchSummary = async () => {
  interactiveLog.await(`[%d/%d] - 요약을 입력하는 중...`, step, totalStep);

  const summaryInquirer = [
    {
      type: 'input',
      name: 'summary',
      message: '요약 입력: ',
      validate: (input) => {
        if (!input) {
          return '요약을 입력해주세요';
        }

        return true;
      },
    },
  ];

  const { summary } = await inquirer.prompt(summaryInquirer);

  step++;

  return summary;
};

module.exports = (async function () {
  console.log(''); // empty line

  const date = dayjs().format('YYYY-MM-DD HH:mm:ss');

  const category = await fetchCategory(BLOG_DIR_PATH);
  const destDir = path.join(BLOG_DIR_PATH, category);
  const destDirExists = await fs.pathExists(destDir);

  if (!destDirExists) {
    await fs.mkdirp(destDir);
  }

  const title = await fetchTitle(BLOG_DIR_PATH, category);
  const fileName = getFileName(title);
  const thumbnail = await fetchThumbnail(path.join(BLOG_DIR_PATH, 'thumbnails'));
  const summary = await fetchSummary();
  const contents = refineContents({
    title,
    date,
    category,
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
