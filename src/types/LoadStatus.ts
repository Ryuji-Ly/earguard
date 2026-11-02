// Where a piece of fetched data is: not requested yet, on its way, there, or failed.
export type LoadStatus = 'idle' | 'loading' | 'loaded' | 'error';
