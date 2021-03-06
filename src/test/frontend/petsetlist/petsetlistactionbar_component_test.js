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

import PetSetListActionBarController from 'petsetlist/petsetlistactionbar_controller';
import petSetListModule from 'petsetlist/petsetlist_module';
import {stateName as deploy} from 'deploy/deploy_state';

describe('Pet Set List Action Bar controller', () => {
  /**
   * Pet Set List controller.
   * @type {!PetSetListController}
   */
  let ctrl;
  /** @type {ui.router.$state} */
  let state;

  beforeEach(() => {
    angular.mock.module(petSetListModule.name);

    angular.mock.inject(($controller, $state) => {
      state = $state;
      ctrl = $controller(PetSetListActionBarController, {
        $state: state,
      });
    });
  });

  it('should redirect to deploy page', () => {
    // given
    spyOn(state, 'go');

    // when
    ctrl.redirectToDeployPage();

    // then
    expect(state.go).toHaveBeenCalledWith(deploy);
  });
});
