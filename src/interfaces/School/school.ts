import { IResponse } from '@interfaces/DTO';
import { TGroup } from '@utils';
export interface ISchoolByArea {
  area: string;
  schools: string;
}
export interface ISchool {
  group: TGroup;
  schoolList: ISchoolByArea[];
}
export interface ISchoolRequest {
  group: string;
  area: string;
  schools: string;
}
export interface ISchoolResponse extends IResponse {
  data: ISchool;
}

export interface ISchoolDictionaryMajor {
  _id: string;
  majorCode?: string;
  majorName?: string;
  entryScore?: string;
  duration?: string;
  fee?: string;
}

export interface ISchoolDictionary {
  _id: string;
  name: string;
  type: string;
  address?: string[];
  city?: string;
  website?: string;
  email?: string;
  phone?: string;
  majors?: ISchoolDictionaryMajor[];
  addmissions?: string;
}

export interface ISchoolDictionaryDetailResponse extends IResponse {
  data: ISchoolDictionary;
}

export interface ISchoolDictionaryResponse extends IResponse {
  data: ISchoolDictionary[];
  totalCount?: number;
}
