import { Action } from "redux";

export enum AsyncActionStatus {
	REQUEST = 'REQUEST',
	SUCCESS = 'SUCCESS',
	FAILURE = 'FAILURE',
}

export interface AsyncAction<T> extends Action<T> {
	status: AsyncActionStatus;
}

export interface ApiAction<T, D = any> extends AsyncAction<T> {
	data?: D;
	error?: Error;
	refreshing?: boolean;
}

export interface ApiPaginationAction<T, D> extends ApiAction<T> {
	page?: number;
	total?: number;
}

export interface RequestState<T = any> {
	data?: T;
	error?: any;
	loading: boolean;
	loaded: boolean;
	refreshing: boolean;
}
export interface PaginationRequestState<T> extends RequestState<T> {
	page: number;
	total: number;
}

export interface PostRequestState{
	error?: any;
	inProgress: boolean;
	done: boolean;
}