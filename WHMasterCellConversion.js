var scope = clientScopeScript.scope;
var parentScope = scope.parentScope;

scope.getItemsPost = function () {
    if (scope.model.rule.validator.item.CellType) {
        scope.model.rule.validator.item.CellType.preMethod = CellTypeChanged;
    }

    if (scope.model.rule.validator.item.PalletType) {
        scope.model.rule.validator.item.PalletType.preMethod = PalletTypeChanged;
    }

    if (scope.model.rule.validator.item.BinType) {
        scope.model.rule.validator.item.BinType.preMethod = BinTypeChanged;
    }
} 

scope.addItemPost = function () {
	
	scope.model.rule.disabled.item.PalletType = false;
	scope.model.rule.disabled.item.BinType = false;
	scope.model.rule.disabled.item.CellType = false;
    if (parentScope.params) {
        setTimeout(function() {
			console.log(parentScope.params)
            if (parentScope.params.CellType)
                scope.item.CellType = parentScope.params.CellType;
            if (parentScope.params.MasterCellRow)
                scope.item.MasterCellRow = parentScope.params.MasterCellRow;
            if (parentScope.params.MasterCellColumn)
                scope.item.MasterCellColumn = parentScope.params.MasterCellColumn;
            parentScope.$digest();
            if (parentScope.params.AutoSubmit)
                setTimeout(function() {
                    scope.saveItem('itemScope');
                }, 200);
        }, 100);
    }
};

scope.editItemPost = function () {
	if (scope.item.CellType && scope.item.CellType > 0)
		CellTypeChanged();
	
	if (scope.item.PalletType && scope.item.PalletType > 0)
		PalletTypeChanged();
	
	if (scope.item.BinType && scope.item.BinType > 0)
		BinTypeChanged();
};

function CellTypeChanged(){
    
    if (scope.saving)
        return;
	
	if(scope.item.CellType.length > 0) {
		scope.item.PalletType = 0;
		scope.item.BinType = 0;

		scope.changeModelList("PalletType", "itemScope");
		scope.changeModelList("BinType", "itemScope");
		
		scope.model.rule.disabled.item.PalletType = true;
		scope.model.rule.disabled.item.BinType = true;
	}
	else {
		scope.model.rule.disabled.item.PalletType = false;
		scope.model.rule.disabled.item.BinType = false;
		
		scope.item.PalletType = 0;
		scope.item.BinType = 0;

		scope.changeModelList("PalletType", "itemScope");
		scope.changeModelList("BinType", "itemScope");
	}
}

function PalletTypeChanged(){
    
    if (scope.saving)
        return;   

	if(scope.item.PalletType > 0) {
		scope.item.CellType = 0;
		scope.item.BinType = 0;

		scope.changeModelList("CellType", "itemScope");
		scope.changeModelList("BinType", "itemScope");
		
		scope.model.rule.disabled.item.CellType = true;
		scope.model.rule.disabled.item.BinType = true;		
	}
	else {
		scope.model.rule.disabled.item.CellType = false;
		scope.model.rule.disabled.item.BinType = false;

		scope.item.CellType = 0;
		scope.item.BinType = 0;

		scope.changeModelList("CellType", "itemScope");
		scope.changeModelList("BinType", "itemScope");
	}
}

function BinTypeChanged(){
    
    if (scope.saving)
        return;

    if(scope.item.BinType > 0) {
		scope.item.PalletType = 0;
		scope.item.CellType = 0;

		scope.changeModelList("PalletType", "itemScope");
		scope.changeModelList("CellType", "itemScope");
		
		scope.model.rule.disabled.item.PalletType = true;
		scope.model.rule.disabled.item.CellType = true;
	}
	else {
		scope.model.rule.disabled.item.PalletType = false;
		scope.model.rule.disabled.item.CellType = false;
		
		scope.item.PalletType = 0;
		scope.item.CellType = 0;

		scope.changeModelList("PalletType", "itemScope");
		scope.changeModelList("CellType", "itemScope");
	}

}

scope.saveItemPre = function() {
    scope.saving = true;   
};

scope.saveItemPost = function() {
    if (!parentScope.item)
        parentScope.item = {};
    if (parentScope.params && parentScope.params.AutoClose) {
        parentScope.item.AutoSubmitStatus = "Auto-Submit-Complete";
    } else
        parentScope.item.AutoSubmitStatus = "Auto-Close not applicable";
};

scope.validatedItemPost = function () {
    scope.saving = null;
    return scope.item.isValid;
};