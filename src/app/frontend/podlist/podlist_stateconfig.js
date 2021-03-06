// Copyright 2015 Google Inc. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {actionbarViewName, stateName as chromeStateName} from 'chrome/chrome_state';
import {breadcrumbsConfig} from 'common/components/breadcrumbs/breadcrumbs_service';
import {stateName as workloadsState} from 'workloads/workloads_state';

import {PodListController} from './podlist_controller';
import {stateName, stateUrl} from './podlist_state';
import {PodListActionBarController} from './podlistactionbar_controller';

/**
 * Configures states for the service view.
 *
 * @param {!ui.router.$stateProvider} $stateProvider
 * @ngInject
 */
export default function stateConfig($stateProvider) {
  $stateProvider.state(stateName, {
    url: stateUrl,
    parent: chromeStateName,
    resolve: {
      'podList': resolvePodList,
    },
    data: {
      [breadcrumbsConfig]: {
        'label': 'Pods',
        'parent': workloadsState,
      },
    },
    views: {
      '': {
        controller: PodListController,
        controllerAs: '$ctrl',
        templateUrl: 'podlist/podlist.html',
      },
      [actionbarViewName]: {
        controller: PodListActionBarController,
        controllerAs: 'ctrl',
        templateUrl: 'podlist/podlistactionbar.html',
      },
    },
  });
}

/**
 * @param {!angular.$resource} $resource
 * @param {!./../chrome/chrome_state.StateParams} $stateParams
 * @return {!angular.$q.Promise}
 * @ngInject
 */
export function resolvePodList($resource, $stateParams) {
  /** @type {!angular.Resource<!backendApi.PodList>} */
  let resource = $resource(`api/v1/pod/${$stateParams.namespace || ''}`);
  return resource.get().$promise;
}
