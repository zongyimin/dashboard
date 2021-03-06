// Copyright 2015 Google Inc. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import stateConfig from './petsetlist_stateconfig';
import filtersModule from 'common/filters/filters_module';
import componentsModule from 'common/components/components_module';
import chromeModule from 'chrome/chrome_module';
import petSetDetailModule from 'petsetdetail/petsetdetail_module';
import {petSetCardComponent} from './petsetcard_component';
import {petSetCardListComponent} from './petsetcardlist_component';

/**
 * Angular module for the Pet Set list view.
 *
 * The view shows Pet Set running in the cluster and allows to manage them.
 */
export default angular.module('kubernetesDashboard.petSetList',
                              [
                                'ngMaterial',
                                'ngResource',
                                'ui.router',
                                filtersModule.name,
                                componentsModule.name,
                                petSetDetailModule.name,
                                chromeModule.name,
                              ])
    .config(stateConfig)
    .component('kdPetSetCardList', petSetCardListComponent)
    .component('kdPetSetCard', petSetCardComponent);
