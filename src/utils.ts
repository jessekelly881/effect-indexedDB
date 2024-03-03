/**
 * @since 1.0.0
 */

import { Effect } from "effect";
import * as Error from "./Error";

/**
 * Convers an IDBRequest into an Effect
 * @since 1.0.0
 */
export const wrapRequest = <T>(
	request: () => IDBRequest<T>,
	onError: (err: DOMException | null) => Error.IndexedDBError
) =>
	Effect.async<T, Error.IndexedDBError>((resume) => {
		const r = request();
		r.onsuccess = () => {
			resume(Effect.succeed(r.result));
		};
		r.onerror = () => {
			resume(Effect.fail(onError(r.error)));
		};
	});
