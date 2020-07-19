<template>
    <div>
        <div class="titleBox">

            <div class="titleBoxWords">教师系统</div>
            <div class="welcomeBox">欢迎！{{UserNameX}} <el-button type="info" @click="exit">注销</el-button></div>

        </div>

        <el-row class="tac">

            <el-col :span="12">
                <el-menu default-active="2"
                         class="el-menu-vertical-demo"
                         @open="handleOpen"
                         @close="handleClose"
                         background-color="#545c64"
                         text-color="#fff"
                         active-text-color="#ffd04b">
                    

                    <el-menu-item index="1" @click="goClassTable">
                        <i class="el-icon-location"></i>
                        <span slot="title">我的授课</span>
                    </el-menu-item>

                    <el-menu-item index="2" @click="goStudentTotalScore">
                        <i class="el-icon-menu"></i>
                        <span slot="title">学生成绩总表</span>
                    </el-menu-item>

                    <el-menu-item index="3" @click="goInputScore">
                        <i class="el-icon-document"></i>
                        <span slot="title">输入成绩</span>
                    </el-menu-item>

                    <el-menu-item index="4" @click="goUserCenter">
                        <i class="el-icon-setting"></i>
                        <span slot="title">个人中心</span>
                    </el-menu-item>
                </el-menu>

            </el-col>
        </el-row>

        <div class="mainBox">
            <!--这里是成绩修改页面-->
            <div v-show="inputScorePage">

                <el-dropdown>
                    <span class="el-dropdown-link">
                        当前输入成绩的课程：{{selectClass.cName}}：<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <template v-for="item in this.allMyClass">
                            <el-dropdown-item @click.native="selectClassMethod(item)">{{item.cName}}</el-dropdown-item>
                        </template>

                    </el-dropdown-menu>
                </el-dropdown>
                平时成绩占比
                <el-select v-model="scoreFactor" placeholder="请选择" class="cNoInputBox" >
                    <el-option label="5-5开" value=0.5></el-option>
                    <el-option label="4-6开" value=0.4></el-option>
                    <el-option label="3-7开" value=0.3></el-option>
                    <el-option label="2-8开" value=0.2></el-option>
                </el-select>
                <el-form ref="scoreTable" label-width="0px" class="demo-dynamic" >

                    <el-form-item>
                        &nbsp;&nbsp;
                        <el-input v-model="showInfo.sNo" class="cNoInputBox" :disabled="true"></el-input>
                        &nbsp;&nbsp;
                        <el-input v-model="showInfo.sName" class="cNoInputBox" :disabled="true"></el-input>
                        &nbsp;&nbsp;
                        <el-input v-model="showInfo.eScoreA" class="cNoInputBox" :disabled="true"></el-input>
                        &nbsp;&nbsp;
                        <el-input v-model="showInfo.eScoreB" class="cNoInputBox" :disabled="true"></el-input>
                        &nbsp;&nbsp;
                        <el-input v-model="showInfo.eScoreC" class="cNoInputBox" :disabled="true"></el-input>

                    </el-form-item>

                    <el-form-item v-for="(data, index) in scoreTable" prop="eScoreA">
                        &nbsp;&nbsp;
                        <el-input v-model="data.sNo" class="cNoInputBox" :disabled="true"></el-input>
                        &nbsp;&nbsp;
                        <el-input v-model="data.sName" class="cNoInputBox" :disabled="true"></el-input>
                        &nbsp;&nbsp;
                        <el-input type="number" v-model.number="data.eScoreA" class="cNoInputBox"></el-input>
                        &nbsp;&nbsp;
                        <el-input type="number" v-model.number="data.eScoreB" class="cNoInputBox"></el-input>
                        &nbsp;&nbsp;
                        <el-input v-model="data.eScoreC" class="cNoInputBox" :disabled="true"></el-input>

                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="commitScore">提交</el-button>
                    </el-form-item>

                </el-form>

            </div>
            <!--这里是课表页面-->
            <div v-show="myClassTablePage">

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
            <!--这里是个人中心页面-->
            <div v-show="userCenterPage">
                个人信息
                <div>

                    <el-table :data="myInfoForm"
                              border
                              style="width: 951px">

                        <el-table-column prop="tNo" label="教师号" width="100"></el-table-column>
                        <el-table-column prop="tName" label="姓名" width="150"></el-table-column>
                        <el-table-column prop="tSex" label="性别" width="50"></el-table-column>
                        <el-table-column prop="tBirth" label="出生日期" width="150"></el-table-column>
                        <el-table-column prop="tXueli" label="职称" width="100"></el-table-column>
                        <el-table-column prop="tSalary" label="月薪" width="150"></el-table-column>
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
            <!--这里是学生成绩总表页面-->
            <div v-show="studentTotalScorePage">
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
                &nbsp;&nbsp;
                <el-dropdown>
                    <span class="el-dropdown-link">
                        课程：{{selectClass.cName}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <template v-for="item in this.allMyClass">
                            <el-dropdown-item @click.native="selectClassMethod2(item)">{{item.cName}}</el-dropdown-item>
                        </template>

                    </el-dropdown-menu>

                </el-dropdown>
                <el-table :data="studentTotalScoreForm"
                          border
                          style="width: 701px">

                    <el-table-column prop="sNo"
                                     label="学号"
                                     width="200">
                    </el-table-column>
                    <el-table-column prop="sName"
                                     label="姓名"
                                     width="200">
                    </el-table-column>
                    <el-table-column prop="eScoreA"
                                     label="平时成绩" width="100">
                    </el-table-column>
                    <el-table-column prop="eScoreB"
                                     label="考试成绩" width="100">
                    </el-table-column>
                    <el-table-column prop="eScoreC"
                                     label="总评成绩" width="100">
                    </el-table-column>
                </el-table>
            <div class="empty_space">111111</div>
                平均成绩:{{avgScore}}
            <div class="empty_space">111111</div>
            <div class="scoreBox">
                成绩分布
                <div class="block">

                    <el-progress type="circle" :percentage="score.A" :color="score.AA"></el-progress>
                    <el-progress type="circle" :percentage="score.B" :color="score.BB"></el-progress>
                    <el-progress type="circle" :percentage="score.C" :color="score.CC"></el-progress>
                    <el-progress type="circle" :percentage="score.D" :color="score.DD"></el-progress>
                    <el-progress type="circle" :percentage="score.E" :color="score.EE"></el-progress>
                </div>
                <div class="scoreA">小于60分</div>
                <div class="scoreB">60-69分</div>
                <div class="scoreC">70-79分</div>
                <div class="scoreD">80-89分</div>
                <div class="scoreE">90-100分</div>

            </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                myInfoForm: [{ tNo: '', tName: '', tSex: '', tBirth: '', tXueli: '', tSalary: '', dNo: '', dName: '' }],
                score: { A: 0, B: 0, C: 0, D: 0, E: 0, AA: "#ff0000", BB: "#ffff00", CC: "#0000cd", DD: "#0000ff", EE: "#00ff00"},

                scoreFormRules: {
                    eScoreA: [
                        { required: true, message: '请输入成绩', trigger: 'blur' },
                        //{ type: 'number', message: '格式有误', trigger: 'blur' },
                    ],
                    number: [{ required: true, message: '请输入成绩', trigger: 'blur' },],
                 
                },

                UserNameX: window.sessionStorage.getItem('Username'),
                allTerm: ['2018-2019秋季', '2018-2019冬季', '2018-2019春季', '2019-2020秋季', '2019-2020冬季', '2019-2020春季', '2020-2021秋季'],
                //selectTerm: '2020-2021秋季',
                selectTerm: window.sessionStorage.getItem('currentTerm'),
                showInfo: {sNo:'学号',sName:'学生姓名',eScoreA:'平时成绩',eScoreB:'考试成绩',eScoreC:'总评成绩'},
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
                totalCredit: '',
                scoreTable: [],
                scoreFactor:0.4,
                passwordForm: {
                    oldPassword: '',
                    newPassword2: '',
                    newPassword: '',
                },

                studentTotalScoreForm:[],

                selectClass: { cNo: '', cName: '' },
                allMyClass:[],

                myClassTablePage: false,
                userCenterPage: false,
                inputScorePage: false,
                studentTotalScorePage: false,
                avgScore:'',

            }
        },
        mounted: function () {

            document.title = '教师主页';
            this.myInfoForm = [];
            var sendData = { mode: 'getMyInfoT', userName: window.sessionStorage.getItem('Username') };
            const result = this.$http.post('http://172.46.100.69:7779/teacher', sendData).then(res => {
                //console.log(res.data);
                this.myInfoForm.push(res.data);
            });


        },
        methods: {
            resetLoginForm() {
                // console.log(this)
                this.$refs.scoreFormRef.resetFields();

            },
            hideAll() {
                this.userCenterPage = false;
                this.myClassTablePage = false;
                this.inputScorePage = false;
                this.studentTotalScorePage = false;
            },
            startGetStudentTotalScore() {
                this.score = { A: 0, B: 0, C: 0, D: 0, E: 0, AA: "#ff0000", BB: "#ffff00", CC: "#0000cd", DD: "#0000ff", EE: "#00ff00" };
                this.avgScore = 0;
                var sendData = { userName: this.UserNameX, oTerm: this.selectTerm, mode: 'getStudentGrade-B', cNo: this.selectClass.cNo };
                this.studentTotalScoreForm = [];
                const result = this.$http.post('http://172.46.100.69:7779/teacher', sendData).then(res => {
                    //console.log(res.data);
                    
                    this.avgScore = res.data.avgGrade[0][0];
                    for (var item in res.data.studentData) {
                        this.studentTotalScoreForm.push(res.data.studentData[item]);
                        if (res.data.studentData[item].eScoreC < 60) {
                            this.score.A += (100 / res.data.studentData.length);
                        }
                        else if (res.data.studentData[item].eScoreC < 70) {
                            this.score.B += (100 / res.data.studentData.length);
                        }
                        else if (res.data.studentData[item].eScoreC < 80) {
                            this.score.C += (100 / res.data.studentData.length);
                        }
                        else if (res.data.studentData[item].eScoreC < 90) {
                            this.score.D += (100 / res.data.studentData.length);
                        }
                        else if (res.data.studentData[item].eScoreC < 101) {
                            this.score.E += (100 / res.data.studentData.length);
                        }
                        
                    };
                    this.score.A = this.score.A.toFixed(2);
                    //alert(this.score.A);
                    this.score.B = this.score.B.toFixed(2);
                    this.score.C = this.score.C.toFixed(2);
                    this.score.D = this.score.D.toFixed(2);
                    this.score.E = this.score.E.toFixed(2);
                });
            },

            selectTermMethod(data, mode) {
                this.selectTerm = data;
                this.score = { A: 0, B: 0, C: 0, D: 0, E: 0, AA: "#ff0000", BB: "#ffff00", CC: "#0000cd", DD: "#0000ff", EE: "#00ff00" };
                this.avgScore = 0;
                if (mode == 0) {
                    //console.log(this.selectTerm);
                    this.goGetClass();
                };

            }, selectClassMethod2(data) {
                this.score = { A: 0, B: 0, C: 0, D: 0, E: 0, AA: "#ff0000", BB: "#ffff00", CC: "#0000cd", DD: "#0000ff", EE: "#00ff00" };
                this.avgScore = 0;
                this.selectClass.cNo = data.cNo;
                this.selectClass.cName = data.cName;

                this.startGetStudentTotalScore();

                //console.log(this.selectClass);

            },
            goGetClass() {
                var sendData = {
                    userName: this.UserNameX, oTerm: this.selectTerm, mode: 'getStudentGrade-A'
                };
                this.allMyClass = [];
                const result = this.$http.post('http://172.46.100.69:7779/teacher', sendData).then(res => {
                    //console.log(res.data);
                    for (var item in res.data.classData) {
                        this.allMyClass.push({ cName: res.data.classData[item].cName, cNo: res.data.classData[item].cNo });
                        this.selectClass.cName = res.data.classData[item].cName;
                        this.selectClass.cNo = res.data.classData[item].cNo;
                    }
                   // console.log(this.allMyClass.length);
                    if (this.allMyClass.length==0) {
                        this.selectClass.cName = '此学期您没有课程！';
                        this.selectClass.cNo = '000000';
                        this.studentTotalScoreForm = [];
                        return;
                    }
                    this.startGetStudentTotalScore();
                    
                });
            },
            
           
            goStudentTotalScore() {
                this.hideAll();
                this.studentTotalScorePage = true;
                this.goGetClass();
            },
            goUserCenter() {
                this.hideAll();
                this.userCenterPage = true;

            },
            commitScore() {
                //console.log(this.scoreTable);
                var item;
                console.log(this.scoreTable);
                var sendData = { mode: 'changeGrade', studentData: [], cNo: this.selectClass.cNo, userName: this.UserNameX };
                for (item in this.scoreTable) {
                    if (this.scoreTable[item].eScoreA == '' && this.scoreTable[item].eScoreB == '') {
                        continue
                    };
                    if (this.scoreTable[item].eScoreA == '') {
                        this.scoreTable[item].eScoreA == 0;
                    };
                    if (this.scoreTable[item].eScoreB == '') {
                        this.scoreTable[item].eScoreB == 0;
                    };
                    var temp1 = parseFloat(this.scoreTable[item].eScoreA);
                    var temp2 = parseFloat(this.scoreTable[item].eScoreB);
                    this.scoreTable[item].eScoreC = parseInt(this.scoreFactor * temp1 + (1 - this.scoreFactor) * temp2);
                    sendData.studentData.push(this.scoreTable[item]);
                };
                const result = this.$http.post('http://172.46.100.69:7779/teacher', sendData).then(res => {
                    if (res.data == '修改成功！') {
                        this.$message.success('修改成功！');
                        this.scoreTable = [];
                        this.goInputScore2();
                    }
                    else {
                        this.$message.error(res.data);
                    };
                });
                //console.log(sendData);
                
            },
            goInputScore2() {
                this.scoreTable = [];
                const sendData = { cNo: this.selectClass.cNo, userName: this.UserNameX, mode: 'getStudentList' };
                const result = this.$http.post('http://172.46.100.69:7779/teacher', sendData).then(res => {
                    
                    var item;
                    for (item in res.data.studentData) {
                        this.scoreTable.push(res.data.studentData[item]);
                    };
                    //console.log(this.scoreTable);
                });
            },
            goInputScore() {
                this.hideAll();
                this.inputScorePage = true;
                this.allMyClass = [];
                const sendData = { mode: 'classTable2', userName: this.UserNameX }
                const result = this.$http.post('http://172.46.100.69:7779/teacher', sendData).then(res => {
                    var item;
                    for (item in res.data.classData) {
                        this.allMyClass.push({ cName: res.data.classData[item].cName, cNo: res.data.classData[item].cNo });
                        this.selectClass.cName = res.data.classData[item].cName;
                        this.selectClass.cNo = res.data.classData[item].cNo;
                        
                    }
                    this.goInputScore2();
                });
            },
            selectClassMethod(data) {
                this.selectClass.cNo = data.cNo;
                this.selectClass.cName = data.cName;
                this.goInputScore2();
                //console.log(this.selectClass);

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
                const sendContent = { mode: 'classTable', userName: this.UserNameX}
                const result = this.$http.post('http://172.46.100.69:7779/teacher', sendContent).then(res => {
                    //console.log(res.data);
                    var temp = res.data;
                    this.totalCredit = temp.sumCredit;
                    const sum = temp.sumClass;
                    if (sum == 0) {

                        //console.log(this.tableData2);
                        return;
                    }
                    var i = 0;
                    for (i = 0; i < sum; i++) {
                        //console.log(temp.classData[i]);
                        const time = temp.classData[i].classTime;
                        
                        this.tableData.push(temp.classData[i]);

                        var j = 0;
                        for (var item in time.A) {

                            this.tableData2[time.A[item] - 1].xxA = temp.classData[i].cName;
                        }
                        for (var item in time.B) {

                            this.tableData2[time.B[item] - 1].xxB = temp.classData[i].cName;
                        }
                        for (var item in time.C) {

                            this.tableData2[time.C[item] - 1].xxC = temp.classData[i].cName;
                        }
                        for (var item in time.D) {

                            this.tableData2[time.D[item] - 1].xxD = temp.classData[i].cName;
                        }
                        for (var item in time.E) {

                            this.tableData2[time.E[item] - 1].xxE = temp.classData[i].cName;
                        }
                    };
                    // console.log(time.A);

                });
            },
            startChangePassword() {
                var sendData = { userName: this.UserNameX, mode: 'changePassword', oldPassword: '', newPassword: '' };
                if (this.passwordForm.newPassword != this.passwordForm.newPassword2) return this.$message.error('两次密码输入不一致！');
                sendData.oldPassword = this.$md5(this.passwordForm.oldPassword);
                sendData.newPassword = this.$md5(this.passwordForm.newPassword);
                //var test = this.$md5(sendData.newPassword);
                //console.log(test);
                const result = this.$http.post('http://172.46.100.69:7779/teacher', sendData).then(res => {
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
            exit() {
                window.sessionStorage.removeItem('token');
                this.$router.push('/login');
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
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
    .cNoInputBox {
        width: 120px;
    }
    .empty_space {
        color: #ffffff;
    }
    .scoreA {
        transform: translate(1.5%,0%);
    }
    .scoreB {
        transform: translate(9.5%,-100%);
    }
    .scoreC {
        transform: translate(17%,-200%);
    }
    .scoreD {
        transform: translate(24.5%,-300%);
    }
    .scoreE {
        transform: translate(31.5%,-400%);
    }
    .scoreBox{

        
    }
</style>