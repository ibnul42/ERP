var scope = clientScopeScript.scope;
    var parentScope = scope.parentScope;

    scope.addItemPost = function () {
        angular.forEach (itemProps, function (itemProp) {
            scope.model.rule.disabled.item[itemProp] = null;
        });
        scope.model.rule.hidden.item.ExitPassCode = true;
        scope.model.rule.hidden.item.ExitTime = true;
        modelValueObj.Vehicle = {
            searchParams: {
                QueryData: '{VendorTransporter: ["0"]}'
            }
        };
        modelValueObj.WarehouseId = {
            searchParams: {
                QueryData: '{Warehouse: ["0"]}'
            }
        };
        modelValueObj.WHClusterId = {
            searchParams: {
                QueryData: '{WarehouseCode:["0"],StorageTypeName:["0"]}'    
            }
        };
        modelValueObj.MasterCellId = {
            searchParams: {
                QueryData: '{ClusterId: ["0"]}'
            }
        };
    };

    var itemProps = [];
    scope.editItemPost = function () {
        itemProps = [];
        for (var attrName in scope.item) {
            itemProps.push(attrName);
            if (scope.item.ExitTime)
                scope.model.rule.disabled.item[attrName] = true;
            else
                scope.model.rule.disabled.item[attrName] = null;
        }
        scope.model.rule.hidden.item.panel2 = null;
        scope.model.rule.hidden.item.ExitPassCode = null;
        scope.model.rule.hidden.item.ExitTime = null;
        modelValueObj.Vehicle = {
            searchParams: {
                QueryData: '{VendorTransporter: [' + scope.item.VendorTransporter + ']}'
            }
        };
        modelValueObj.WarehouseId = {
            searchParams: {
                QueryData: '{Warehouse: [' + scope.item.SourceShipPt + ']}'
            }
        };
        modelValueObj.WHClusterId = {
            searchParams: {
                QueryData: '{WarehouseCode:[' + scope.item.WarehouseId + '],StorageTypeName:["GI_AREA"]}'
            }
        };
        modelValueObj.MasterCellId = {
            searchParams: {
                QueryData: '{ClusterId: [' + scope.item.WHClusterId + ']}'
            }
        };
    };

    scope.getItemsPost = function () {
        if (scope.model.rule.validator.item.VendorTransporter) {
            scope.model.rule.validator.item.VendorTransporter.preMethod = VendorTransporterChanged;
        }
        if (scope.model.rule.validator.item.Vehicle) {
            scope.model.rule.validator.item.Vehicle.preMethod = VehicleChanged;
        }
        if (scope.model.rule.validator.item.Driver) {
            scope.model.rule.validator.item.Driver.preMethod = DriverChanged;
        }
        if (scope.model.rule.validator.item.SourceShipPt) {
            scope.model.rule.validator.item.SourceShipPt.preMethod = SourceShipPtChanged;
        }
        if (scope.model.rule.validator.item.WarehouseId) {
            scope.model.rule.validator.item.WarehouseId.preMethod = WarehouseIdChanged;
        }
        if (scope.model.rule.validator.item.WHClusterId) {
            scope.model.rule.validator.item.WHClusterId.preMethod = WHClusterIdChanged;
        }
    };
    
    function WHClusterIdChanged    () {
        if(scope.saving)
            return;
        scope.item.MasterCellId = 0;
        scope.changeModelList("MasterCellId", "itemScope");
        modelValueObj.MasterCellId = {
            searchParams: {
                QueryData: '{ClusterId: ["' + scope.item.WHClusterId + '"]}'
            }
        };
    }

    function WarehouseIdChanged() {
        if(scope.saving)
            return;
        scope.item.WHClusterId = 0;
        scope.item.MasterCellId = 0;
        scope.changeModelList("WHClusterId", "itemScope");
        scope.changeModelList("MasterCellId", "itemScope");
        modelValueObj.WHClusterId = {
            searchParams: {
                QueryData: '{WarehouseCode:[' + scope.item.WarehouseId + '],StorageTypeName:["GI_AREA"]}'    
            }
        };
    }

    function SourceShipPtChanged() {
        if (scope.saving)
            return;
            // console.log(scope.item.SourceShipPt)
        // if (scope.item.SourceShipPt && scope.item.SourceShipPt > 0) {
            // parentScope.showProgress(parentScope.literals.lblLoading);
            // scope.dataFactory.instance().getAll(scope.item.SourceShipPt + '?ObjectType=T041')
                // .then(function(d) { 
                    // if (d.data && d.data.MetaData) {
                            // console.log(d.data.MetaData)
                            // scope.item.WarehouseId = d.data.MetaData.T041Id;
                            // scope.changeModelList("WarehouseId", "itemScope");
                            // console.log(scope.item.WarehouseId)
                    // }
                    // parentScope.hideProgress();
                // });
        // } else {
            // // scope.item.CollectiveNo = null;
        // }
        scope.item.WarehouseId = 0;
        scope.item.WHClusterId = 0;
        scope.item.MasterCellId = 0;   
        scope.changeModelList("WarehouseId", "itemScope");
        scope.changeModelList("WHClusterId", "itemScope");
        scope.changeModelList("MasterCellId", "itemScope");
        modelValueObj.WarehouseId = {
            searchParams: {
                QueryData: '{Warehouse: ["' + scope.item.SourceShipPt + '"]}'
            }
        };
    }

    function VendorTransporterChanged () {
        if (scope.saving)
            return;
            
        scope.item.Vehicle = 0;   
        scope.changeModelList("Vehicle", "itemScope");
        modelValueObj.Vehicle = {
            searchParams: {
                QueryData: '{VendorTransporter: ["' + scope.item.VendorTransporter + '"]}'
            }
        };
        // scope.item.Vehicle = 0;
        // scope.changeModelList("Vehicle", "itemScope");
    }

    function VehicleChanged () {
        if (scope.saving)
            return;
        
        parentScope.showProgress(parentScope.literals.lblLoading);
        scope.dataFactory.instance().getAll('?ObjectType=EntryExitGatePass&QueryData={VehicleId: ["' + scope.item.Vehicle + '"]}')
            .then(function (d) {
                console.log(d)
                if (d.data && d.data.Items && d.data.Items.length && d.data.Items[0].MetaData) {
                    scope.item.Driver = d.data.Items[0].MetaData.Driver;
                    scope.changeModelList("Driver", "itemScope");
                    scope.item.PhoneNum = d.data.Items[0].MetaData.PhoneNum;
                }
                parentScope.hideProgress();
        });
    }

    function DriverChanged () {
        if (scope.saving)
            return;
       //scope.item.DriverNameId = modelValueObj.latestFetchResult.Driver[scope.item.Driver].DriverName;
        scope.item.PhoneNum = modelValueObj.latestFetchResult.Driver[scope.item.Driver].DriverPhone;
        //parentScope.$digest();
        // console.log(scope.item.DriverNameId);
        // parentScope.showProgress(parentScope.literals.lblLoading);
         // scope.dataFactory.instance().getAll('?ObjectType=VehicleDriver')
            // .then(function (d) {
                // for(var i=0; i<d.data.Items.length; i++){
                    // if(d.data.Items[i].MetaData.DriverName == scope.item.DriverNameId)
                        // console.log(d.data.Items[i].MetaData.VehicleDriverId);
                    // else 
                    // console.log(d.data.Items[i]);
                // }
                // if (d.data && d.data.Items && d.data.Items.length && d.data.Items[0].MetaData) {
                // // console.log(d.data.Items[0].MetaData.DriverPhone);
                // scope.item.PhoneNum = d.data.Items[0].MetaData.DriverPhone;
                    
                // }
                // parentScope.hideProgress();
        // });
    }

    // modelValueObj.Vehicle = {
        // searchParams: {
            // QueryData: '{Vehicle: ["0"]}'
        // }
    // };

    scope.saveItemPre = function () {
        scope.saving = true;
    };

    scope.saveItemPost = function () {
        scope.saving = null;
    };

    scope.handleErrorPost = function() {
        if (scope.Errors && scope.Errors.length > 0) {
            if (scope.Errors[0] && scope.Errors[0].message && 
            scope.Errors[0].message.indexOf("SAME_COMBINATION_EXISTS") > -1) {
                parentScope.notify("warning", parentScope.literals.lblSameCombinationExists);
            }
        }
        scope.saving = null;
    };