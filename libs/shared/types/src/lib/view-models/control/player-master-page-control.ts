export class PlayerMasterPageControl {
    pageTitle: string = "Player Master  List";
    searchInputLabel: string = "Search Player with name";
    isBackButtonEnabled: boolean = false;
    searchClearTooltipLabel: string = 'Clear Search';
    crudOption = [
    //     {
    //     icon: 'add',
    //     iconClass:'material-icons-outlined',
    //     actionType: 'add',
    //     matTooltip:'Add Player',
    //     buttonTitle:'Add Player',
    //     isMenu: false,
    //     isDisable: false,
    //     buttonClass : 'primary white-text ts-1 text-uppercase'
    // },
    {
        icon: 'add',
        iconClass:'material-icons-outlined',
        actionType: 'add',
        matTooltip:'Add Player',
        buttonTitle:'',
        isMenu: false,
        isDisable: false,
        buttonClass : 'dark'
    },
    {
        icon: 'replay',
        iconClass:'material-icons-outlined',
        actionType: 'refresh',
        matTooltip:'Refresh',
        buttonTitle:'',
        isMenu: false,
        isDisable: false,
        buttonClass : 'dark'
    }]
}
