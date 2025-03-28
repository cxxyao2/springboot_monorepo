/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { getDemo } from '../fn/demo-controller/get-demo';
import { GetDemo$Params } from '../fn/demo-controller/get-demo';
import { postDemo } from '../fn/demo-controller/post-demo';
import { PostDemo$Params } from '../fn/demo-controller/post-demo';

@Injectable({ providedIn: 'root' })
export class DemoControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getDemo()` */
  static readonly GetDemoPath = '/demo';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDemo()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDemo$Response(params?: GetDemo$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return getDemo(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getDemo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDemo(params?: GetDemo$Params, context?: HttpContext): Observable<string> {
    return this.getDemo$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `postDemo()` */
  static readonly PostDemoPath = '/demo';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postDemo()` instead.
   *
   * This method doesn't expect any request body.
   */
  postDemo$Response(params?: PostDemo$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return postDemo(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `postDemo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  postDemo(params?: PostDemo$Params, context?: HttpContext): Observable<string> {
    return this.postDemo$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

}
