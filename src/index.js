import parser from '@enre-ts/doc-parser';
import finder from '@enre-ts/test-finder';
import {createLogger} from '@enre-ts/shared';
import {clear, cli} from '@enre-ts/test-generator';
import customize from './customize';
import fs from 'node:fs/promises';
import path from 'node:path';

/**
 * You can use (or import use in other files) this logger object to log messages.
 */
export const logger = createLogger('my test generator');
cli.action(generator);

/**
 * EDIT SECTION BEGIN
 * Do not change code before this line (except for adding imports).
 */

customize(
    [/* TODO: Language-dependent anonymous entity kinds */],
);

/**
 * Only add code if you are instructed. You are not suggested to modify existing code
 * unless you know what you are doing clearly.
 */
async function generator(opts) {
    /**
     * This variable holds the previous group name.
     *
     * @type {string}
     */
    let prevGroupName = undefined;

    /**
     * This array holds all test framework code for all test cases in the previous group.
     *
     * @type {string[]}
     */
    let accumulatedCases = [];

    await parser(
        await finder(opts),

        async (entry, groupMeta) => {
            if (prevGroupName === undefined) {
                prevGroupName = groupMeta.name;
            }

            // Write PREVIOUS cases into file
            if (accumulatedCases.length !== 0) {
                let content = '';

                /**
                 * TODO: Build the test framework code and save it to the variable `content`
                 *
                 * Do not forget to change the extension name!
                 */
                content = 'Setup\n' + accumulatedCases.join('\n') + '\nTeardown';

                try {
                    await fs.writeFile(`tests/suites/_${prevGroupName}.txt`, content);
                } catch (e) {
                    logger.error(e);
                }
            }

            prevGroupName = groupMeta.name;
            accumulatedCases = [];

            // Given the CURRENT group name, init the directory in /tests
            if (groupMeta.name !== 'END_OF_PROCESS') {
                await clear(groupMeta.name);
            }
        },

        undefined,

        async (entry, caseObj, groupMeta, testPath) => {
            /**
             * This array is responsible for mapping `file0`, `file1`, etc. in the location
             * assertion to the actual file path so that you can find the file entity by path.
             *
             * @type {string[]}
             */
            const filePathList = [];

            /**
             * This variable holds the path of the directory holds the test code files, the
             * directory is created for you automatically, so you don't need to create it and
             * code files within it.
             *
             * @type {string}
             */
            let casePath = undefined;

            /**
             * If `code` exists in the caseObj, it means that this test case is a document test,
             * we need create a directory in `tests/cases` and write all test code files to it.
             */
            if (caseObj.code) {
                casePath = `tests/cases/_${groupMeta.name}/_${caseObj.assertion.name}`;
                try {
                    await fs.mkdir(casePath, {recursive: true});
                } catch (e) {
                    logger.error(e);
                }

                for (const file of caseObj.code) {
                    filePathList.push(file.path);
                    try {
                        const filePath = `${casePath}/${file.path}`;
                        // Create parent directory if not existed, using `recursive` so that already existed is not an error
                        await fs.mkdir(path.dirname(filePath), {recursive: true});
                        await fs.writeFile(`${casePath}/${file.path}`, file.content);
                    } catch (e) {
                        logger.error(e);
                    }
                }
            }
            /**
             * If `code` does not exist in the caseObj, it means that this test case is a
             * standalone test which usually locates in `tests/cases` directory, in which case
             * there is no need to write code files to local file system (given they are already
             * there). The only noticeable thing is that we need to handle the `define` property
             * that defines the mapping relation of `file0`, `file1`, etc. to the actual file.
             */
            else {
                casePath = `tests/cases/${groupMeta.name}/${caseObj.assertion.name}`;
                if (caseObj.assertion.define) {
                    for (const [key, path] of Object.entries(caseObj.assertion.define)) {
                        const index = parseInt(key.slice(4));
                        filePathList[index] = path;
                    }
                }
            }

            /**
             * TODO: Build the test framework code and push it to `accumulatedCases`
             *
             * Variables defined above can be used, see correlated comments for definitions.
             */
            accumulatedCases.push('Test framework code for a single case');
        },

        /* TODO: A regex expression describing the code block's language tag in markdown */
        /[Jj][Aa][Vv][Aa]/,

        /* TODO: The language name */
        'java',
    );
}

/**
 * EDIT SECTION END
 * Do not change code after this line, write your custom functions in seperated files.
 */

cli.parse(process.argv);
