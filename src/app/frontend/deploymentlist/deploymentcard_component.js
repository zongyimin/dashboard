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

import {StateParams} from 'common/resource/resourcedetail';
import {stateName} from 'deploymentdetail/deploymentdetail_state';

/**
 * Controller for the replica set card.
 *
 * @final
 */
export default class DeploymentCardController {
  /**
   * @param {!ui.router.$state} $state
   * @ngInject
   */
  constructor($state) {
    /**
     * Initialized from the scope.
     * @export {!backendApi.Deployment}
     */
    this.deployment;

    /** @private {!ui.router.$state} */
    this.state_ = $state;
  }

  /**
   * @return {string}
   * @export
   */
  getDeploymentDetailHref() {
    return this.state_.href(stateName, new StateParams(this.deployment.objectMeta.namespace,
                                                       this.deployment.objectMeta.name));
  }

  /**
   * Returns true if any of replica set pods has warning, false otherwise
   * @return {boolean}
   * @export
   */
  hasWarnings() { return this.deployment.pods.warnings.length > 0; }

  /**
   * Returns true if replica set pods have no warnings and there is at least one pod
   * in pending state, false otherwise
   * @return {boolean}
   * @export
   */
  isPending() { return !this.hasWarnings() && this.deployment.pods.pending > 0; }

  /**
   * @return {boolean}
   * @export
   */
  isSuccess() { return !this.isPending() && !this.hasWarnings(); }
}

/**
 * @return {!angular.Component}
 */
export const deploymentCardComponent = {
  bindings: {
    'deployment': '=',
  },
  controller: DeploymentCardController,
  templateUrl: 'deploymentlist/deploymentcard.html',
};
