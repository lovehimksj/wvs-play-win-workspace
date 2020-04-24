import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Login} from '../model/login.model';
import {AuthenticationService} from '../service/authentication.service';
import {UserResponse} from '../../shared/response/user-response';
import {CurrentUser} from '../../../modals/currentUser.model';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheet, MatBottomSheetRef, MatDialog, MatSnackBar} from '@angular/material';
import {ParkingResponse} from '../../shared/response/parking-response';
import {ResponseCode} from '../../shared/response/response-code.enum';
import {SessionService} from '../../shared/service/session/session.service';
import {UserProvider} from '../../shared/providers/user-provider.service';
import {AlertDialogService} from '../../shared/service/alert-dialog.service';
import {environment} from '../../../../environments/environment';
import {CaptchaService} from '../service/captcha/captcha.service';
import {AppConstant} from '../../../../root.config';
import {Maxlength, Minlength, Pattern, ValMsgs} from '../../shared/validations/validationClass';
import {PasswordValidation} from '../../shared/pattern-matcher';
import {ChangePasswordModalComponent} from '../change-password-modal/change-password-modal.component';

@Component({
    selector: 'app-login', templateUrl: './login.component.html', styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {
    env = environment;
    appConstant = AppConstant;
    public captchaImage: string = '';
    login: boolean = true;
    loginForm: FormGroup = new FormGroup({});
    loginUserModel: Login = new Login();
    invalidForm: boolean = false;
    @ViewChild('loginDataForm') loginDataForm;
    @ViewChild('captchaImages') captchaImages: ElementRef;
    maxLength: Maxlength = new Maxlength();
    minLength: Minlength = new Minlength();
    messages: ValMsgs = new ValMsgs();
    pattern: Pattern = new Pattern();

    constructor(private route: Router,
                private fb: FormBuilder,
                private authentication: AuthenticationService,
                private session: SessionService,
                private userProvider: UserProvider,
                public dialog: MatDialog, private snackBar: MatSnackBar, private authenticationService: AuthenticationService, public alert: AlertDialogService, private captcha: CaptchaService, private bottomSheet: MatBottomSheet) {
    }


    ngAfterViewInit() {
        this.getCaptchaCode();
    }

    ngOnInit() {
        if (this.userProvider.retrieveCurrentUser() === null) {
            this.createLoginForm();
        } else {
            if (this.userProvider.retrieveCurrentUser().bbDetail.length > 0) {
                this.route.navigate(['app', 'dashboard', 'parking']);
            } else {
                this.route.navigate(['app', 'welcome']);
            }

        }
        // this.createLoginForm();
    }

    /** Generate captcha code */
    public getCaptchaCode() {
        const value = this.captcha.generateRandomText();
        this.loginForm.controls['captcha'].setValue(value);
        const canvas = this.captcha.generate(`${value}`).canvas;
        this.captchaImage = CaptchaService.convertCanvasToImage(canvas);
        this.captchaImages.nativeElement.src = this.captchaImage;
    }

    /*openBottomSheet(): void {
        this.bottomSheet.open(BottomSheetOverviewExampleSheetComponent);
    }*/

    loginUser(loginForm: FormGroup) {
        // this.openBottomSheet();
        console.log(loginForm.value.userName);
        if (!loginForm.valid) {
            this.invalidForm = true;
            return false;
        }
        this.authentication.validateUser(loginForm.value)
            .subscribe((response) => {
                if (response.success) {
                    const currentUser: CurrentUser = response.data;
                    // console.log(response.data.changePasswordFlag);
                    if (response.data.changePasswordFlag === 0) {
                        this.authentication.getParkingUserDetail(currentUser.userId)
                            .subscribe((res: ParkingResponse) => {
                                if (res.responseCode === ResponseCode.success) {
                                    const userParkingData: CurrentUser = res.data;
                                    currentUser.parkingLotId = userParkingData.parkingLotId;
                                    currentUser.bbDetail = userParkingData.bbDetail;
                                    this.userProvider.updateUser(currentUser);
                                    this.route.navigate(['app', 'dashboard', 'parking']);
                                } else {
                                    this.route.navigate(['app', 'welcome']);
                                }
                                this.snackBar.open(`Welcome ${currentUser.firstName} to timepay chalo`);
                            }, error2 => {

                            });
                        // this.openBottomSheet();

                    } else {
                        const dialogRef = this.dialog.open(ChangePasswordModalComponent, {
                            width: '600px',
                        });
                        dialogRef.afterClosed().subscribe(result => {
                            if (!result) {
                                return false;
                            }
                            this.changePassword(result);
                        });
                    }
                } else {
                    this.alert.responseUserErrorHandling(response.errors[0]);
                    this.loginDataForm.resetForm();
                    this.getCaptchaCode();
                }
            }, error2 => {
                console.log(error2);
                this.alert.userErrorHandling(error2);
                this.loginDataForm.resetForm();
                this.getCaptchaCode();
            });
    }

    openBottomSheet(): void {
        const bottomSheetRef = this.bottomSheet.open(BottomSheetOverviewExampleSheetComponent, {
            data: {
                names: [{
                    'boomBarrierCode': '1100', 'boomBarrierType': 0
                }, {
                    'boomBarrierCode': '1101', 'boomBarrierType': 2
                }]
            },
        });
        console.log(bottomSheetRef.backdropClick().subscribe(value => value));
        // this.bottomSheet.open(BottomSheetOverviewExampleSheetComponent);
    }

    private changePassword(result) {
        this.authenticationService.changePasswordDetails(this.loginForm.value.userName, result.value)
            .subscribe((response: UserResponse) => {
                if (response.success) {
                    this.snackBar.open(response.data);
                    this.loginDataForm.resetForm();
                } else {
                    // this.snackBar.open(response.errors[0].details);
                    this.alert.responseUserErrorHandling(response.errors[0]);
                    this.loginDataForm.resetForm();
                }
            }, error2 => {
                console.log(error2);
                this.alert.userErrorHandling(error2);
            });
    }

    private createLoginForm() {
        this.loginForm = this.fb.group({
            userName: new FormControl(this.loginUserModel.userName, [Validators.required, Validators.pattern(this.pattern.userNamePattern), Validators.maxLength(this.maxLength.nameLength), Validators.minLength(this.minLength.userNameMinLength)]),
            password: new FormControl(this.loginUserModel.password, [Validators.required, Validators.maxLength(this.maxLength.passwordLength)]),
            captcha: new FormControl(''),
            confirmCaptcha: new FormControl('', [Validators.required, Validators.pattern(this.pattern.captchaPattern), Validators.maxLength(this.maxLength.captchaLength), Validators.minLength(this.minLength.captchaMinLength)])

        }, {validator: PasswordValidation.MatchCaptcha});
    }

}

export interface Section {
    boomBarrierCode: string;
    boomBarrierType: number;
}

export interface BoomBarrierList {
    label: string;
    section: Array<Section>;
}

@Component({
    selector: 'app-sheet-overview-example-sheet',
    template: `<h3 class="fs-18 dark-text fw-500">Please Current Boom Barrier</h3>
    <mat-list>
        <h3 mat-subheader>{{entryBoomBarrier.label}}</h3>
        <mat-list-item *ngFor="let fold of entryBoomBarrier.section">
            <mat-checkbox class="example-margin">
                {{fold.boomBarrierCode}}
            </mat-checkbox>
        </mat-list-item>
        <mat-divider></mat-divider>
        <h3 mat-subheader>{{exitBoomBarrier.label}}</h3>
        <mat-list-item *ngFor="let fold of exitBoomBarrier.section">
            <mat-checkbox class="example-margin">
                {{fold.boomBarrierCode}}
            </mat-checkbox>
        </mat-list-item>
    </mat-list>`,
})

export class BottomSheetOverviewExampleSheetComponent {
    entryBoomBarrier: BoomBarrierList;
    exitBoomBarrier: BoomBarrierList;

    constructor(private bottomSheetRef: MatBottomSheetRef<LoginComponent>, @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
        console.log(data.names);
        this.entryBoomBarrier = {
            label: 'Entry', section: this.data.names.filter((value: Section) => value.boomBarrierType === 0)
        };
        this.exitBoomBarrier = {
            label: 'Exit', section: this.data.names.filter((value: Section) => value.boomBarrierType === 2)
        };
        // this.folders = boomBarrierList;
    }
}
