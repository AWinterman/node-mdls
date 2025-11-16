export default mdls;
export type MdlsReady = (err?: null | import("node:child_process").ExecException, deserialized?: {}) => void;
export type MdlsValue = string | number | Date | null | (string | number | Date | null)[];
/**
 * @typedef {(
 *   err?: null|import('node:child_process').ExecException,
 *   deserialized?: {}
 * ) => void} MdlsReady
 */
/**
 * @param {string} file
 * @param {string|MdlsReady} [args]
 * @param {MdlsReady} [ready]
 */
declare function mdls(file: string, args?: string | MdlsReady, ready?: MdlsReady): Promise<any>;
