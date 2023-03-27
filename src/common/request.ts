import {request} from '@@/exports';
import type {PageInfo, PageParams, Response} from '@/common/models';
import {Method} from '@/common/models';
import type {Convert, Struct} from '@/common/tree';
import {toTree} from '@/common/tree';
import {RequestOptionsType} from "@ant-design/pro-components";
import {DefaultOptionsConvert, OptionsConvert} from "@/common/options";

export class Request {
  static async getPage<T>(uri: string, params: PageParams & {}, options?: Record<string, any>) {
    const response = await request<PageInfo<T>>(uri, {
      method: Method.GET,
      params: {
        ...params,
      },
      ...(options || {}),
    });
    return response;
  }

  static async getList<T>(uri: string, params?: {}, options?: Record<string, any>) {
    const response = await request<PageInfo<T>>(uri, {
      method: Method.GET,
      params: {
        ...params,
      },
      ...(options || {}),
    });
    return response;
  }

  static async getOptions<T>(uri: string, params?: {}, options?: Record<string, any>, convert?: OptionsConvert): Promise<RequestOptionsType[]> {
    const response = await request<Response<T[]>>(uri, {
      method: Method.GET,
      params: {
        ...params,
      },
      ...(options || {}),
    });
    if (response.success && response.data) {
      const selectOptions: RequestOptionsType[] = [];
      response.data.forEach(item => {
        if (convert) {
          selectOptions.push(convert(item))
        } else {
          selectOptions.push(DefaultOptionsConvert(item))
        }
      })
      return selectOptions;
    }
    return [];
  }

  static async get<T>(uri: string, params: {}, options?: Record<string, any>) {
    return await request<Response<T>>(uri, {
      method: Method.GET,
      params: {
        ...params,
      },
      ...(options || {}),
    });
  }

  static async getTree<T>(
    uri: string,
    struct: Struct,
    params?: {},
    convert?: Convert,
    needParent?: boolean,
    options?: Record<string, any>,
  ) {
    const response = await request<PageInfo<T>>(uri, {
      method: Method.GET,
      params: {
        ...params,
      },
      ...(options || {}),
    });
    response.data = toTree(response.data, struct, convert, needParent);
    return response;
  }

  static async getConvertNeedParentTree<T>(
    uri: string,
    params?: {},
    convert?: Convert,
    options?: Record<string, any>,
  ) {
    const struct: Struct = {
      id: 'id',
      parent: 'parentId',
      children: 'children',
      parentNode: 'parent',
    };
    return this.getTree<T>(uri, struct, params, convert, true, options);
  }

  static async getConvertTree<T>(
    uri: string,
    params?: {},
    convert?: Convert,
    options?: Record<string, any>,
  ) {
    const struct: Struct = {
      id: 'id',
      parent: 'parentId',
      children: 'children',
      parentNode: 'parent',
    };
    return this.getTree<T>(uri, struct, params, convert, false, options);
  }

  static async getDefaultTree<T>(uri: string, params: {}, options?: Record<string, any>) {
    const struct: Struct = {
      id: 'id',
      parent: 'parentId',
      children: 'children',
      parentNode: 'parent',
    };
    return this.getTree<T>(uri, struct, params, undefined, false, options);
  }

  static async post<T>(uri: string, data?: {}, options?: Record<string, any>) {
    return await request<Response<T>>(uri, {
      method: Method.POST,
      data,
      ...(options || {}),
    });
  }

  static async put<T>(uri: string, options?: Record<string, any>) {
    return await request<Response<T>>(uri, {
      method: Method.PUT,
      ...(options || {}),
    });
  }

  static async delete<T>(uri: string, options?: Record<string, any>) {
    return await request<Response<T>>(uri, {
      method: Method.DELETE,
      ...(options || {}),
    });
  }
}

export async function getData<T>(response: Response<T> | undefined, check: boolean, obj: T) {
  return check && response && response.success && response.data ? response.data : obj;
}

export async function getListData<T>(response: Response<T> | undefined, check: boolean, obj: T) {
  return check && response && response.success && response.data ? response.data : obj;
}
