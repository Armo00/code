<template>
    <div>
        <el-dialog title="操作结果提示"
                   :visible.sync="dialogVisible"
                   width="30%"
                   :before-close="handleClose">
            <el-table :data="selectResultData"
                      border
                      style="width: 1151px">

                <el-table-column prop="cNo"
                                 label="课程号"
                                 width="200">
                </el-table-column>
                <el-table-column prop="tNo"
                                 label="教师号"
                                 width="100">
                </el-table-column>
                <el-table-column prop="mode"
                                 label="操作结果" width="150">
                </el-table-column>

            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        <div class="titleBox">

            <div class="titleBoxWords">学生主页</div>
            <div class="welcomeBox">欢迎！{{UserNameX}}
                <el-button type="info" @click="exit">注销</el-button>
            </div>
            

        </div>

        <el-row class="tac">

            <el-col :span="12">
                <el-menu default-active="2"
                         class="el-menu-vertical-demo"
                         background-color="#545c64"
                         text-color="#fff"
                         active-text-color="#ffd04b">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span>选课管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="1-1" @click="goSelectClass">选课</el-menu-item>
                            <el-menu-item index="1-2"@click="goCancelClass">退课</el-menu-item>
                        </el-menu-item-group>

                        <el-menu-item index="1-4" @click="goClassTable">我的课表</el-menu-item>


                    </el-submenu>

                    <el-menu-item index="2"@click="goSearchClass">
                        <i class="el-icon-s-order"></i>
                        <span slot="title">课程查询</span>
                    </el-menu-item>

                    <el-menu-item index="3" @click="rua">
                        <i class="el-icon-s-data"></i>
                        <span slot="title">成绩查询</span>
                    </el-menu-item>

                    <el-menu-item index="4" @click="goUserCenter">
                        <i class="el-icon-setting"></i>
                        <span slot="title">个人中心</span>
                    </el-menu-item>
                </el-menu>

            </el-col>
        </el-row>
        <div class="mainBox">
            <div v-show="selectClassPage">
                <!--这里是选课页面-->
                当前选课学期：{{currentTerm}}
                <el-form :model="selectClassForm" ref="selectClassForm" label-width="100px" class="demo-dynamic">

                    <el-form-item v-for="(domain, index) in selectClassForm.domains" :label="'课程' + index">
                        <el-input v-model="domain.cNo" class="cNoInputBox"></el-input>
                        教师号：
                        <el-input v-model="domain.tNo" class="cNoInputBox"></el-input>
                        <el-button @click.prevent="removeDomain(domain)">删除</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('selectClassForm')">提交</el-button>
                        <el-button @click="addDomain">新增课程</el-button>
                        <el-button @click="resetForm('selectClassForm')">重置</el-button>
                    </el-form-item>
                </el-form>


            </div>
            <!--这里是退课页面-->
            <div v-show="cancelClassPage">
                当前退课学期：{{currentTerm}}
                <el-table :data="tableData"
                          ref="multipleTable"
                          @selection-change="handleSelectionChange"
                          border
                          style="width: 1206px">
                    <el-table-column type="selection"
                                     width="55">
                    </el-table-column>

                    <el-table-column prop="cNo"
                                     label="课程号"
                                     width="200">
                    </el-table-column>
                    <el-table-column prop="cName"
                                     label="课程名"
                                     width="200">
                    </el-table-column>
                    <el-table-column prop="tNo"
                                     label="教师号"
                                     width="100">
                    </el-table-column>
                    <el-table-column prop="tName"
                                     label="教师名" width="100">
                    </el-table-column>
                    <el-table-column prop="cCredit"
                                     label="学分" width="100">
                    </el-table-column>
                    <el-table-column prop="oTime"
                                     label="上课时间" width="250">
                    </el-table-column>
                    <el-table-column prop="oPlace"
                                     label="上课地点" width="200">
                    </el-table-column>
                </el-table>
                <el-button @click="goCancelClassConfirmed()">确认退课</el-button>
            </div>
            <div v-show="selectQueuePage">
                这里是选课排名查看页面
            </div>
            <!--这里是我的课表页面-->
            <div v-show="myClassTablePage">

                <el-dropdown>
                    <span class="el-dropdown-link">
                        当前选择学期：{{selectTerm}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <template v-for="item in this.allTerm">
                            <el-dropdown-item @click.native="selectTermMethod(item,1)">{{item}}</el-dropdown-item>
                        </template>

                    </el-dropdown-menu>
                </el-dropdown>
                <el-table :data="tableData"
                          border
                          style="width: 1151px">

                    <el-table-column prop="cNo"
                                     label="课程号"
                                     width="200">
                    </el-table-column>
                    <el-table-column prop="cName"
                                     label="课程名"
                                     width="200">
                    </el-table-column>
                    <el-table-column prop="tNo"
                                     label="教师号"
                                     width="100">
                    </el-table-column>
                    <el-table-column prop="tName"
                                     label="教师名" width="100">
                    </el-table-column>
                    <el-table-column prop="cCredit"
                                     label="学分" width="100">
                    </el-table-column>
                    <el-table-column prop="oTime"
                                     label="上课时间" width="250">
                    </el-table-column>
                    <el-table-column prop="oPlace"
                                     label="上课地点" width="200">
                    </el-table-column>
                </el-table>
                <div class="creditBox">总学分：{{totalCredit}}</div>
                <el-table :data="tableData2"
                          border
                          style="width: 1151px">

                    <el-table-column prop="xx0"
                                     label=""
                                     width="50">
                    </el-table-column>
                    <el-table-column prop="xxA"
                                     label="一"
                                     width="220">
                    </el-table-column>
                    <el-table-column prop="xxB"
                                     label="二"
                                     width="220">
                    </el-table-column>
                    <el-table-column prop="xxC"
                                     label="三"
                                     width="220">
                    </el-table-column>
                    <el-table-column prop="xxD"
                                     label="四"
                                     width="220">
                    </el-table-column>
                    <el-table-column prop="xxE"
                                     label="五"
                                     width="220">
                    </el-table-column>

                </el-table>
            </div>
            <!--这里是课程查询页面-->
            <div v-show="classSearchPage">
                <el-form :model="searchClassForm" label-width="0px" class="login_form">
                    <!--UserName-->

                    <el-form-item label="" prop="课程号">
                        课程号：
                        <el-input v-model="searchClassForm.cNo" class="cNoInputBox"></el-input>
                    </el-form-item>
                    <!--PassWord-->
                    <el-form-item label="" prop="课程名">
                        课程名：
                        <el-input v-model="searchClassForm.cName" class="cNoInputBox"></el-input>
                    </el-form-item>
                    <el-form-item label="" prop="教师号">
                        教师号：
                        <el-input v-model="searchClassForm.tNo" class="cNoInputBox"></el-input>
                    </el-form-item>

                    <el-form-item label="" prop="教师名">
                        教师名：
                        <el-input v-model="searchClassForm.tName" class="cNoInputBox"></el-input>
                    </el-form-item>

                    <!--Button-->
                    <el-form-item class="btns">
                        <el-button type="primary" @click="startSearchClass">查询</el-button>
                    </el-form-item>
                </el-form>
                <el-table :data="classData" class="classSearchBox"
                          border
                          style="width: 1201px">

                    <el-table-column prop="cNo"
                                     label="课程号"
                                     width="200">
                    </el-table-column>
                    <el-table-column prop="cName"
                                     label="课程名"
                                     width="200">
                    </el-table-column>
                    <el-table-column prop="tNo"
                                     label="教师号"
                                     width="100">
                    </el-table-column>
                    <el-table-column prop="tName"
                                     label="教师名" width="100">
                    </el-table-column>
                    <el-table-column prop="cCredit"
                                     label="学分" width="100">
                    </el-table-column>
                    <el-table-column prop="oTime"
                                     label="上课时间" width="200">
                    </el-table-column>
                    <el-table-column prop="oPlace"
                                     label="上课地点" width="200">
                    </el-table-column>
                    <el-table-column prop="oCurrentStudentCount"
                                     label="选课人数" width="50">
                    </el-table-column>
                    <el-table-column prop="oMaxStudentCount"
                                     label="课程容量" width="50">
                    </el-table-column>
                </el-table>
            </div>
            <!--这里是成绩查询页面-->
            <div v-show="gradePage">

                <el-dropdown>
                    <span class="el-dropdown-link">
                        当前选择学期：{{selectTerm}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <template v-for="item in this.allTerm">
                            <el-dropdown-item @click.native="selectTermMethod(item,0)">{{item}}</el-dropdown-item>
                        </template>

                    </el-dropdown-menu>
                </el-dropdown>
                <el-table :data="gradeData"
                          border
                          style="width: 901px">

                    <el-table-column prop="cNo"
                                     label="课程号"
                                     width="200">
                    </el-table-column>
                    <el-table-column prop="cName"
                                     label="课程名"
                                     width="200">
                    </el-table-column>
                    <el-table-column prop="tNo"
                                     label="教师号"
                                     width="100">
                    </el-table-column>
                    <el-table-column prop="tName"
                                     label="教师名" width="100">
                    </el-table-column>
                    <el-table-column prop="cCredit"
                                     label="学分" width="100">
                    </el-table-column>
                    <el-table-column prop="eScoreC"
                                     label="总评成绩" width="100">
                    </el-table-column>
                    <el-table-column prop="eGPA"
                                     label="绩点" width="100">
                    </el-table-column>
                </el-table>
                <div class="empty_space">111111</div>
                <el-table :data="gradeSum"
                          border
                          style="width: 901px">

                    <el-table-column prop="credit"
                                     label="总学分:"
                                     width="200">
                    </el-table-column>
                    <el-table-column prop="GPA"
                                     label="GPA"
                                     width="200">
                    </el-table-column>

                </el-table>

            </div>
            <!--这里是个人中心页面-->
            <div v-show="userCenterPage">
                个人信息
                <div>
                    
                    <el-table :data="myInfoForm"
                              border
                              style="width: 951px">

                        <el-table-column prop="sNo" label="学号" width="100"></el-table-column>
                        <el-table-column prop="sName" label="姓名" width="150"></el-table-column>
                        <el-table-column prop="sSex" label="性别" width="50"></el-table-column>
                        <el-table-column prop="sBirth" label="出生日期" width="150"></el-table-column>
                        <el-table-column prop="sNativeplace" label="籍贯" width="100"></el-table-column>
                        <el-table-column prop="sContact" label="联系方式" width="150"></el-table-column>
                        <el-table-column prop="dNo" label="部门号" width="100"></el-table-column>
                        <el-table-column prop="dName" label="部门名" width="150"></el-table-column>

                    </el-table>
                </div>

                修改密码
                <el-form :model="passwordForm" label-width="0px" class="login_form">

                    <el-form-item label="" prop="课程号">
                        <div>
                            请输入原密码：
                            <el-input v-model="passwordForm.oldPassword" class="cNoInputBox"></el-input>
                        </div>
                        <div>
                            请输入新密码：
                            <el-input v-model="passwordForm.newPassword" class="cNoInputBox" type="password"></el-input>
                        </div>
                        <div>
                            再次输入密码：
                            <el-input v-model="passwordForm.newPassword2" class="cNoInputBox" type="password"></el-input>
                        </div>

                    </el-form-item>


                    <!--Button-->
                    <el-form-item class="btns">
                        <el-button type="primary" @click="startChangePassword">提交</el-button>
                    </el-form-item>
                </el-form>

            </div>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                allTerm: ['2018-2019秋季', '2018-2019冬季', '2018-2019春季', '2019-2020秋季', '2019-2020冬季', '2019-2020春季', '2020-2021秋季'],
                selectTerm: '2020-2021秋季',
                UserNameX: window.sessionStorage.getItem('Username'),
                currentTerm: window.sessionStorage.getItem('currentTerm'),
                dialogVisible: false,
                gradeData: [],
                gradeSum:[],
                tableData: [],
                tableData2: [
                    { xx0: 1, xxA: '', xxB: '', xxC: '', xxD: '', xxE: '' },
                    { xx0: 2, xxA: '', xxB: '', xxC: '', xxD: '', xxE: '' },
                    { xx0: 3, xxA: '', xxB: '', xxC: '', xxD: '', xxE: '' },
                    { xx0: 4, xxA: '', xxB: '', xxC: '', xxD: '', xxE: '' },
                    { xx0: 5, xxA: '', xxB: '', xxC: '', xxD: '', xxE: '' },
                    { xx0: 6, xxA: '', xxB: '', xxC: '', xxD: '', xxE: '' },
                    { xx0: 7, xxA: '', xxB: '', xxC: '', xxD: '', xxE: '' },
                    { xx0: 8, xxA: '', xxB: '', xxC: '', xxD: '', xxE: '' },
                    { xx0: 9, xxA: '', xxB: '', xxC: '', xxD: '', xxE: '' },
                    { xx0: 10, xxA: '', xxB: '', xxC: '', xxD: '', xxE: '' },
                    { xx0: 11, xxA: '', xxB: '', xxC: '', xxD: '', xxE: '' },
                    { xx0: 12, xxA: '', xxB: '', xxC: '', xxD: '', xxE: '' },
                    { xx0: 13, xxA: '', xxB: '', xxC: '', xxD: '', xxE: '' },
                ],
                selectResultData: [],
                classData: [],
                passwordForm: {
                    oldPassword: '',
                    newPassword2:'',
                    newPassword:'',
                },
                searchClassForm: {
                    cNo: '',
                    cName: '',
                    tNo: '',
                    tName:'',
                },
                selectClassForm: {
                    domains: [{ cNo: '', tNo: '', }],
                    userName: window.sessionStorage.getItem('Username'),
                    mode: 'selectClass',
                    term: 'PlaceHolder'
                },
                dropClassForm: {
                    domains: [],
                    userName: window.sessionStorage.getItem('Username'),
                    mode: 'dropClass',
                    term: 'PlaceHolder'
                },
                totalCredit:'PlaceHolder',
                sendContent: { Mode: 'studentSelectClass' },
                multipleSelection: [],

                selectClassFormRules: {
                    cNo: [{ required: true, message: '请输入课程号', trigger: 'blur' },],
                    tNo: [{ required: true, message: '请输入教师号', trigger: 'blur' },]
                },
                myInfoForm: [{ sNo: '', sName: '', sSex: '', sBirth: '', sNativeplace: '', sContact: '', dNo: '',dName:''}],
                
                selectClassPage: false,
                cancelClassPage: false,
                selectQueuePage: false,
                classSearchPage: false,
                gradePage: false,
                userCenterPage: false,
                myClassTablePage: false,
            }
            
        },
        mounted: function () {

            document.title = '学生主页';
            this.myInfoForm = [];
            var sendData = { mode: 'getMyInfo', userName: window.sessionStorage.getItem('Username') };
            const result = this.$http.post('http://172.46.100.69:7778/student', sendData).then(res => {
                //console.log(res.data);
                this.myInfoForm.push(res.data);
            });



        },
        methods: {
            exit() {
                window.sessionStorage.removeItem('token');
                this.$router.push('/login');
            },
            startChangePassword() {
                var sendData = { userName: this.UserNameX,mode: 'changePassword', oldPassword: '', newPassword: '' };
                if (this.passwordForm.newPassword != this.passwordForm.newPassword2) return this.$message.error('两次密码输入不一致！');
                sendData.oldPassword = this.$md5(this.passwordForm.oldPassword);
                sendData.newPassword = this.$md5(this.passwordForm.newPassword);
                //var test = this.$md5(sendData.newPassword);
                //console.log(test);
                const result = this.$http.post('http://172.46.100.69:7778/student', sendData).then(res => {
                    if (res.data.result == 1) {
                        this.$message.success('密码修改成功！');
                        
                        return this.exit();
                    };
                    if (res.data.result == 0) {
                        this.$message.error('密码修改失败！');
                        return;
                    }
                });
                
            },
            goUserCenter() {
                this.hideAll();
                this.userCenterPage = true;

            },
            startSearchClass() {
                this.classData = [];
                var sendData = { cNo: '', cName: '', tNo: '', tName: '', mode: 'queryClass' };
                
                if (this.searchClassForm.cNo == "") { sendData.cNo = 'NULL' }
                else { sendData.cNo = this.searchClassForm.cNo; };

                if (this.searchClassForm.cName == '') { sendData.cName = 'NULL' }
                else { sendData.cName = this.searchClassForm.cName; };

                if (this.searchClassForm.tNo == '') { sendData.tNo = 'NULL' }
                else { sendData.tNo = this.searchClassForm.tNo; };

                if (this.searchClassForm.tName == '') { sendData.tName = 'NULL' }
                else { sendData.tName = this.searchClassForm.tName; };
                /*
                sendData.cNO = this.searchClassForm.cNo;
                sendData.cName = this.searchClassForm.cName;
                sendData.tNo = this.searchClassForm.tNo;
                sendData.tName = this.searchClassForm.tName; */
                const result = this.$http.post('http://172.46.100.69:7778/student', sendData).then(res => {
                    console.log(res.data.result);
                    if (res.data.flag == 0) return this.$message.error('没有查询到相关课程');
                    var item;
                    for (item in res.data.result) {
                        this.classData.push(res.data.result[item]);
                    };
                });
                
            },
            goSearchClass() {
                this.hideAll();
                this.classSearchPage = true;
            },
            selectTermMethod(data,mode) {
                this.selectTerm = data;
                if (mode == 0) {
                    this.rua()
                };
                if (mode == 1) { this.goClassTable(); };
                
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => { });
            },
            submitForm(formName) {
                //console.log(this.selectClassForm)
                const result = this.$http.post('http://172.46.100.69:7778/student', this.selectClassForm).then(res => {
                    this.selectResultData = [];
                    
                    //const selectResult = [{ cNo: '3500', tNo: '1000', mode: '选课成功' }, { cNo: '3501', tNo: '1000', mode: '选课成功' }, { cNo: '3502', tNo: '1000', mode: '时间冲突' }, { cNo: '3503', tNo: '1000', mode: '已选此课程' }, { cNo: '3504', tNo: '1000', mode: '此课程不开放' }];
                    const selectResult = res.data.resultData;
                    //console.log(selectResult);
                    var item;
                    for (item in selectResult) {
                        this.selectResultData.push(selectResult[item]);
                    };
                    this.dialogVisible = true;
                });
                
                
                
                
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            removeDomain(item) {
                var index = this.selectClassForm.domains.indexOf(item)
                if (index !== -1) {
                    this.selectClassForm.domains.splice(index, 1)
                }
            },
            addDomain() {
                this.selectClassForm.domains.push({
                    //value: '',
                    //key: Date.now()
                });
            },

            hideAll() {
                this.selectClassPage = false;
                this.cancelClassPage = false;
                this.selectQueuePage = false;
                this.classSearchPage = false;
                this.gradePage = false;
                this.userCenterPage = false;
                this.myClassTablePage = false;
            },

            goClassTable() {
                this.hideAll();
                this.myClassTablePage = true;
                this.tableData = [];
                this.tableData2 = [
                    { xx0: 1, xxA: '', xxB: '', xxC: '', xxD: '', xxE: '' },
                    { xx0: 2, xxA: '', xxB: '', xxC: '', xxD: '', xxE: '' },
                    { xx0: 3, xxA: '', xxB: '', xxC: '', xxD: '', xxE: '' },
                    { xx0: 4, xxA: '', xxB: '', xxC: '', xxD: '', xxE: '' },
                    { xx0: 5, xxA: '', xxB: '', xxC: '', xxD: '', xxE: '' },
                    { xx0: 6, xxA: '', xxB: '', xxC: '', xxD: '', xxE: '' },
                    { xx0: 7, xxA: '', xxB: '', xxC: '', xxD: '', xxE: '' },
                    { xx0: 8, xxA: '', xxB: '', xxC: '', xxD: '', xxE: '' },
                    { xx0: 9, xxA: '', xxB: '', xxC: '', xxD: '', xxE: '' },
                    { xx0: 10, xxA: '', xxB: '', xxC: '', xxD: '', xxE: '' },
                    { xx0: 11, xxA: '', xxB: '', xxC: '', xxD: '', xxE: '' },
                    { xx0: 12, xxA: '', xxB: '', xxC: '', xxD: '', xxE: '' },
                    { xx0: 13, xxA: '', xxB: '', xxC: '', xxD: '', xxE: '' },
                ];
                const sendContent = { mode: 'classTable', userName: this.UserNameX,term:this.selectTerm }
                const result = this.$http.post('http://172.46.100.69:7778/student', sendContent).then(res => {
                    var temp = res.data;
                    this.totalCredit = temp.sumCredit;
                    const sum = temp.sumClass;
                    if (sum == 0) {

                        //console.log(this.tableData2);
                        return;
                    }
                    var i = 0;
                    for (i = 0; i < sum; i++) {

                        const time = temp.classData[0][i].classTime;
                        this.tableData.push(temp.classData[0][i]);
                        
                        var j = 0;
                        for (var item in time.A) {

                            this.tableData2[time.A[item]-1].xxA = temp.classData[0][i].cName;
                        }
                        for (var item in time.B) {

                            this.tableData2[time.B[item]-1].xxB = temp.classData[0][i].cName;
                        }
                        for (var item in time.C) {

                            this.tableData2[time.C[item]-1].xxC = temp.classData[0][i].cName;
                        }
                        for (var item in time.D) {

                            this.tableData2[time.D[item]-1].xxD = temp.classData[0][i].cName;
                        }
                        for (var item in time.E) {

                            this.tableData2[time.E[item]-1].xxE = temp.classData[0][i].cName;
                        }
                    };
                   // console.log(time.A);
                   
                });
            },
            

            rua() {
                this.hideAll();
                this.gradePage = true;
                this.gradeSum = [];
                this.gradeData = [];
                const sendData = { mode: 'getGrade', userName: this.UserNameX, term: this.selectTerm };
                const result = this.$http.post('http://172.46.100.69:7778/student', sendData).then(res => {
                    console.log(res);
                    var returnData = res.data;
                    var item;
                    for (item in returnData.result) {
                        this.gradeData.push(returnData.result[item]);
                    }
                    this.gradeSum.push({ credit: returnData.sumCredit, GPA: returnData.sumGPA });
                });
                
                
            },
            goSelectClass() {
                const sendContent = {Mode:'getSelectTime'}
                
                const result = this.$http.post('login', sendContent).then(res => {
                    if (res.data.result == 0) {
                        this.hideAll();
                        return this.$alert('未到选课时间', '提示', { confirmButtonText: '确定', });
                    };
                    this.hideAll();
                    this.selectClassPage = true;
                    //if (res.data.result == 1) this.$message.success('选课(placeHolder)');

                });
                //this.$message.success('rua');
                
            },
            goCancelClassConfirmed(rows) {
                var item;
                this.dropClassForm.domains = [];
                for (item in this.multipleSelection) {
                    var cNoX = this.multipleSelection[item].cNo;
                    var tNoX = this.multipleSelection[item].tNo;
                    var temp = { cNo: cNoX ,tNo:tNoX};
                    this.dropClassForm.domains.push(temp);

                };
                const result = this.$http.post('http://172.46.100.69:7778/student', this.dropClassForm).then(res => {
                    this.selectResultData = [];

                    //const selectResult = [{ cNo: '3500', tNo: '1000', mode: '选课成功' }, { cNo: '3501', tNo: '1000', mode: '选课成功' }, { cNo: '3502', tNo: '1000', mode: '时间冲突' }, { cNo: '3503', tNo: '1000', mode: '已选此课程' }, { cNo: '3504', tNo: '1000', mode: '此课程不开放' }];
                    const selectResult = res.data.resultData;
                    //console.log(selectResult);
                    var item;
                    for (item in selectResult) {
                        this.selectResultData.push(selectResult[item]);
                    };
                    this.dialogVisible = true;
                    this.goCancelClass();
                });
                
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            goCancelClass() {
                const sendContent = { Mode: 'getSelectTime' }

                const result = this.$http.post('login', sendContent).then(res => {
                    if (res.data.result == 0) {
                        this.hideAll();
                        return this.$alert('未到退课时间', '提示', { confirmButtonText: '确定', });
                    };
                    this.hideAll();
                    this.cancelClassPage = true;
                    this.tableData = [];
                    const sendContent = { mode: 'classTable', userName: this.UserNameX, term: window.sessionStorage.getItem('currentTerm') }
                    const result = this.$http.post('http://172.46.100.69:7778/student', sendContent).then(res => {
                        const temp = res.data;
                        this.totalCredit = temp.sumCredit;
                        const sum = temp.sumClass;
                        var i = 0;
                        for (i = 0; i < sum; i++) {
                            //const time = { 'A': [4, 5, 6], 'B': [], 'C': [9, 10, 11], 'D': [], 'E': [] };
                            const time = temp.classData[0][i].classTime;
                            this.tableData.push(temp.classData[0][i]);
                        };

                        // console.log(time.A);

                    });

                });
                
            },
        }
    };
</script>

<style lang="less" scoped>
    .titleBox {
        width: 2000px;
        height: 100px;
        //background-color: #545c64;
        background-color: #2d2e36;
    }
    .titleBoxWords {
        color: #ffffff;
        font-size: 50px;
        text-shadow: 0 0 3px #ddd;
        font-family: DengXian;
        width: 200px;
        height: 20px;
        position: absolute;
        left: 50%;
        transform: translate(-50%,100%);
    }
    .el-menu-vertical-demo{
        width:200px;
        height:1000px;

    }
    .welcomeBox {
        width: 200px;
        font-size: 20px;
        position: absolute;
        transform: translate(600%,100%);
        text-shadow: 0 0 3px #ddd;
        font-family: DengXian;
        color: #ffffff;
    }
    .mainBox {
        border: 3px solid #eee;
        height: 1000px;
        width: 1690px;
        //position: absolute;
        transform: translate(12%,-99%);
    }
    .creditBox {
        border: 1px solid #eee;
        height: 50px;
        width: 1150px;
        font-family: "Hiragino Sans GB"
    }
    .cNoInputBox{
        width:200px;
    }
    .empty_space{
        color:#ffffff;
    }
    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }

    .el-icon-arrow-down {
        font-size: 12px;
    }
    .login_form {
        position: absolute;
        width: 500px;
        padding: 0 20px;
        box-sizing: border-box;
    }
    .classSearchBox {
        position: absolute;
        top:330px;
    }
</style>