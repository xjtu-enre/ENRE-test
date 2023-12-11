import {addENRENameAnonKind} from '@enre-ts/naming';
import {useCustomCaseSchema} from '@enre-ts/doc-validator';

/**
 * This function is called before parsing test files and should only be called
 * once, which setup language specific customization in the test pipeline.
 */
export default async function (
    NewENRENameAnonKind,
) {
    addENRENameAnonKind(NewENRENameAnonKind);

    useCustomCaseSchema(await import('./case-meta.js'));
}
