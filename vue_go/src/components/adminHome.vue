<template>
    <div>

        <el-dialog title="操作结果提示"
                   :visible.sync="selectResultVisible"
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
                <el-button type="primary" @click="selectResultVisible = false">确 定</el-button>
            </span>
        </el-dialog>


        <div class="titleBox">


            <div class="titleBoxWords">管理员系统</div>
            <div class="welcomeBox">欢迎！{{UserNameX}} <el-button type="info" @click="exit">注销</el-button></div>
        </div>
        <!--修改学生信息弹窗-->
        <el-dialog title="修改学生信息" :visible.sync="dialogFormVisible">
            <el-form :model="studentModifyForm">
                <el-form-item label="学号" :label-width="formLabelWidth">
                    <el-input v-model="studentModifyForm.sNo" autocomplete="off" class="dateInputBox" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="studentModifyForm.sName" autocomplete="off" class="dateInputBox"></el-input>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth">
                    <el-select v-model="studentModifyForm.sSex" placeholder="请选择" class="cNoInputBox">
                        <el-option label="男" value="男"></el-option>
                        <el-option label="女" value="女"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="出生日期" :label-width="formLabelWidth">
                    <el-date-picker v-model="studentModifyForm.sBirth"
                                    type="date"
                                    class="cNoInputBox"
                                    value-format="yyyy-MM-dd"
                                    placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="籍贯" :label-width="formLabelWidth">
                    <el-input v-model="studentModifyForm.sNativeplace" class="cNoInputBox"></el-input>
                </el-form-item>
                <el-form-item label="联系方式" :label-width="formLabelWidth">
                    <el-input v-model="studentModifyForm.sContact" class="cNoInputBox"></el-input>
                </el-form-item>
                <el-form-item label="所属部门" :label-width="formLabelWidth">
                    <el-select v-model="studentModifyForm.dNo" placeholder="请选择部门" class="cNoInputBox">
                        <el-option v-for="(item,index) in allDepartmentInfoForm"
                                   :key="item.dNo"
                                   :label="item.dName"
                                   :value="item.dNo">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="commitStudentInfoModify">确 定</el-button>
            </div>
        </el-dialog>
        <!--修改部门信息弹窗-->
        <el-dialog title="修改部门信息" :visible.sync="dialogDepartmentFormVisible">
            <el-form :model="departmentModifyForm">
                <el-form-item label="部门号" :label-width="formLabelWidth">
                    <el-input v-model="departmentModifyForm.dNo" autocomplete="off" class="dateInputBox" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="部门名" :label-width="formLabelWidth">
                    <el-input v-model="departmentModifyForm.dName" autocomplete="off" class="dateInputBox"></el-input>
                </el-form-item>
                <el-form-item label="部门位置" :label-width="formLabelWidth">
                    <el-input v-model="departmentModifyForm.dLocation" class="cNoInputBox"></el-input>
                </el-form-item>
                <el-form-item label="联系方式" :label-width="formLabelWidth">
                    <el-input v-model="departmentModifyForm.dContact" class="cNoInputBox"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogDepartmentFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="commitDepartmentInfoModify">确 定</el-button>
            </div>
        </el-dialog>
        <!--修改教师信息弹窗-->
        <el-dialog title="修改教师信息" :visible.sync="dialogTeacherFormVisible">
            <el-form :model="teacherModifyForm">
                <el-form-item label="教师号" :label-width="formLabelWidth">
                    <el-input v-model="teacherModifyForm.tNo" autocomplete="off" class="dateInputBox" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="teacherModifyForm.tName" autocomplete="off" class="dateInputBox"></el-input>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth">
                    <el-select v-model="teacherModifyForm.tSex" placeholder="请选择" class="cNoInputBox">
                        <el-option label="男" value="男"></el-option>
                        <el-option label="女" value="女"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="出生日期" :label-width="formLabelWidth">
                    <el-date-picker v-model="teacherModifyForm.tBirth"
                                    type="date"
                                    class="cNoInputBox"
                                    value-format="yyyy-MM-dd"
                                    placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="职称" :label-width="formLabelWidth">
                    <el-select v-model="teacherModifyForm.tXueli" placeholder="请选择" class="cNoInputBox">
                        <el-option label="教授" value="教授"></el-option>
                        <el-option label="副教授" value="副教授"></el-option>
                        <el-option label="讲师" value="讲师"></el-option>
                        <el-option label="助教" value="助教"></el-option>
                    </el-select>
                </el-form-item>


                <el-form-item label="月薪" :label-width="formLabelWidth">
                    <el-input v-model="teacherModifyForm.tSalary" class="cNoInputBox"></el-input>
                </el-form-item>
                <el-form-item label="所属部门" :label-width="formLabelWidth">
                    <el-select v-model="teacherModifyForm.dNo" placeholder="请选择部门" class="cNoInputBox">
                        <el-option v-for="(item,index) in allDepartmentInfoForm"
                                   :key="item.dNo"
                                   :label="item.dName"
                                   :value="item.dNo">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogTeacherFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="commitTeacherInfoModify">确 定</el-button>
            </div>
        </el-dialog>
        <!--修改课程信息弹窗-->
        <el-dialog title="修改课程信息" :visible.sync="dialogClassFormVisible">
            <el-form :model="classModifyForm">
                <el-form-item label="课程号" :label-width="formLabelWidth">
                    <el-input v-model="classModifyForm.cNo" autocomplete="off" class="dateInputBox" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="课程名" :label-width="formLabelWidth">
                    <el-input v-model="classModifyForm.cName" autocomplete="off" class="dateInputBox"></el-input>
                </el-form-item>
                <el-form-item label="学分" :label-width="formLabelWidth">
                    <el-input v-model="classModifyForm.cCredit" class="cNoInputBox"></el-input>
                </el-form-item>
                <el-form-item label="所属部门" :label-width="formLabelWidth">
                    <el-select v-model="classModifyForm.dNo" placeholder="请选择部门" class="cNoInputBox">
                        <el-option v-for="(item,index) in allDepartmentInfoForm"
                                   :key="item.dNo"
                                   :label="item.dName"
                                   :value="item.dNo">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogClassFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="commitClassInfoModify">确 定</el-button>
            </div>
        </el-dialog>
        <!--开课信息弹窗-->
        <el-dialog title="开课信息" :visible.sync="dialogOpenFormVisible">
            <el-form :model="openClassForm">
                <el-form-item label="课程号" :label-width="formLabelWidth">
                    <el-input v-model="openClassForm.cNo" autocomplete="off" class="cNoInputBox" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="课程名" :label-width="formLabelWidth">
                    <el-input v-model="openClassForm.cName" autocomplete="off" class="cNoInputBox" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="学分" :label-width="formLabelWidth">
                    <el-input v-model="openClassForm.cCredit" class="cNoInputBox" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="教师号" :label-width="formLabelWidth">
                    <el-input v-model="openClassForm.tNo" class="cNoInputBox"></el-input>
                    <el-button @click="addDomainClassTime">新增上课时间</el-button>
                </el-form-item>
                <el-form-item v-for="(data, index) in classTime.data" label="上课时间" :label-width="formLabelWidth">

                    <el-select v-model="data.cT" placeholder="上课日" class="classTimeInputBox">
                        <el-option label="周一" value="A"></el-option>
                        <el-option label="周二" value="B"></el-option>
                        <el-option label="周三" value="C"></el-option>
                        <el-option label="周四" value="D"></el-option>
                        <el-option label="周五" value="E"></el-option>
                    </el-select>
                    <el-select v-model="data.cTstart" placeholder="开始" class="classTimeInputBox">
                        <el-option label="1" value="1"></el-option>
                        <el-option label="2" value="2"></el-option>
                        <el-option label="3" value="3"></el-option>
                        <el-option label="4" value="4"></el-option>
                        <el-option label="5" value="5"></el-option>
                        <el-option label="6" value="6"></el-option>
                        <el-option label="7" value="7"></el-option>
                        <el-option label="8" value="8"></el-option>
                        <el-option label="9" value="9"></el-option>
                        <el-option label="10" value="10"></el-option>
                        <el-option label="11" value="11"></el-option>
                        <el-option label="12" value="12"></el-option>
                        <el-option label="13" value="13"></el-option>
                    </el-select>
                    <el-select v-model="data.cTend" placeholder="开始" class="classTimeInputBox">
                        <el-option label="1" value="1"></el-option>
                        <el-option label="2" value="2"></el-option>
                        <el-option label="3" value="3"></el-option>
                        <el-option label="4" value="4"></el-option>
                        <el-option label="5" value="5"></el-option>
                        <el-option label="6" value="6"></el-option>
                        <el-option label="7" value="7"></el-option>
                        <el-option label="8" value="8"></el-option>
                        <el-option label="9" value="9"></el-option>
                        <el-option label="10" value="10"></el-option>
                        <el-option label="11" value="11"></el-option>
                        <el-option label="12" value="12"></el-option>
                        <el-option label="13" value="13"></el-option>
                    </el-select>

                    <el-button @click.prevent="removeDomainClassTime(data)">删除</el-button>
                </el-form-item>



                <el-form-item label="上课地点" :label-width="formLabelWidth">
                    <el-input v-model="openClassForm.oPlace" class="cNoInputBox"></el-input>
                </el-form-item>
                <el-form-item label="课程容量" :label-width="formLabelWidth">
                    <el-input v-model="openClassForm.oMaxStudentCount" class="cNoInputBox"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogOpenFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="commitOpenClass">确 定</el-button>
            </div>
        </el-dialog>
        <!--修改课程信息弹窗-->
        <el-dialog title="修改课程信息" :visible.sync="dialogOpenFormModifyVisible">
            <el-form :model="openClassModifyForm">
                <!-- openClassForm: {cNo:'',tNo:'',oTerm:'',oTime:'',oPlace:'',oMaxStudentCount:''},-->
                <el-form-item label="课程号" :label-width="formLabelWidth">
                    <el-input v-model="openClassModifyForm.cNo" autocomplete="off" class="dateInputBox" :disabled="true"></el-input>
                </el-form-item>

                <el-form-item label="教师号" :label-width="formLabelWidth">
                    <el-input v-model="openClassModifyForm.tNo" class="cNoInputBox" :disabled="true"></el-input>
                    <el-button @click="addDomainClassTime">新增上课时间</el-button>
                </el-form-item>
                <el-form-item v-for="(data, index) in classTime.data" label="上课时间" :label-width="formLabelWidth">

                    <el-select v-model="data.cT" placeholder="上课日" class="classTimeInputBox">
                        <el-option label="周一" value="A"></el-option>
                        <el-option label="周二" value="B"></el-option>
                        <el-option label="周三" value="C"></el-option>
                        <el-option label="周四" value="D"></el-option>
                        <el-option label="周五" value="E"></el-option>
                    </el-select>
                    <el-select v-model="data.cTstart" placeholder="开始" class="classTimeInputBox">
                        <el-option label="1" value="1"></el-option>
                        <el-option label="2" value="2"></el-option>
                        <el-option label="3" value="3"></el-option>
                        <el-option label="4" value="4"></el-option>
                        <el-option label="5" value="5"></el-option>
                        <el-option label="6" value="6"></el-option>
                        <el-option label="7" value="7"></el-option>
                        <el-option label="8" value="8"></el-option>
                        <el-option label="9" value="9"></el-option>
                        <el-option label="10" value="10"></el-option>
                        <el-option label="11" value="11"></el-option>
                        <el-option label="12" value="12"></el-option>
                        <el-option label="13" value="13"></el-option>
                    </el-select>
                    <el-select v-model="data.cTend" placeholder="开始" class="classTimeInputBox">
                        <el-option label="1" value="1"></el-option>
                        <el-option label="2" value="2"></el-option>
                        <el-option label="3" value="3"></el-option>
                        <el-option label="4" value="4"></el-option>
                        <el-option label="5" value="5"></el-option>
                        <el-option label="6" value="6"></el-option>
                        <el-option label="7" value="7"></el-option>
                        <el-option label="8" value="8"></el-option>
                        <el-option label="9" value="9"></el-option>
                        <el-option label="10" value="10"></el-option>
                        <el-option label="11" value="11"></el-option>
                        <el-option label="12" value="12"></el-option>
                        <el-option label="13" value="13"></el-option>
                    </el-select>

                    <el-button @click.prevent="removeDomainClassTime(data)">删除</el-button>
                </el-form-item>



                <el-form-item label="上课地点" :label-width="formLabelWidth">
                    <el-input v-model="openClassModifyForm.oPlace" class="cNoInputBox"></el-input>
                </el-form-item>
                <el-form-item label="课程容量" :label-width="formLabelWidth">
                    <el-input v-model="openClassModifyForm.oMaxStudentCount" class="cNoInputBox"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogOpenFormModifyVisible = false">取 消</el-button>
                <el-button type="primary" @click="commitOpenClassModify">确 定</el-button>
            </div>
        </el-dialog>

        <el-row class="tac">
            <!--这里是菜单-->
            <el-col :span="12">

                <el-menu default-active="2"
                         class="el-menu-vertical-demo"
                         background-color="#545c64"
                         text-color="#fff"
                         active-text-color="#ffd04b">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span>选课设置</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="1-1" @click="setSelectTime">设置选课时间</el-menu-item>
                        </el-menu-item-group>

                        <el-menu-item index="1-3" @click="setSelectClass">增加学生选课</el-menu-item>


                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-document"></i>
                            <span>课程管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="2-1" @click="setClassManage">所有课程</el-menu-item>
                            <el-menu-item index="2-2" @click="setConfigOpenClassManage">开课管理</el-menu-item>

                        </el-menu-item-group>
                    </el-submenu>

                    <el-menu-item index="3" @click="setStudentManage">
                        <i class="el-icon-user"></i>
                        <span slot="title">学生管理</span>
                    </el-menu-item>

                    <el-menu-item index="4" @click="setTeacherManage">
                        <i class="el-icon-user-solid"></i>
                        <span slot="title">教师管理</span>
                    </el-menu-item>




                    <el-menu-item index="5" @click="setDepartmentManage">
                        <i class="el-icon-house"></i>
                        <span slot="title">部门管理</span>
                    </el-menu-item>
                    <el-menu-item index="6" @click="goUserCenter">
                        <i class="el-icon-setting"></i>
                        <span slot="title">个人中心</span>
                    </el-menu-item>
                </el-menu>

            </el-col>
        </el-row>
        <div class="mainBox">
            <!--这里是学生管理页面-->
            <div v-show="studentManage">

                <el-tabs v-model="activeName" @tab-click="setStudentManage">
                    <el-tab-pane label="修改学生信息" name="firstS">
                        <el-form :model="searchForm" ref="searchForm" label-width="100px" class="demo-dynamic">
                            <el-form-item label="搜索学号：">
                                <el-input v-model="searchForm.sNo" class="cNoInputBox"></el-input>
                                <el-button @click.prevent="startSearch(0)">开始搜索</el-button>
                            </el-form-item>
                        </el-form>

                        <el-table :data="allStudentInfoForm"
                                  border
                                  style="width: 1101px">
                            <el-table-column fixed prop="sNo" label="学号" width="100"></el-table-column>
                            <el-table-column fixed prop="sName" label="姓名" width="150"></el-table-column>
                            <el-table-column fixed prop="sSex" label="性别" width="50"></el-table-column>
                            <el-table-column fixed prop="sBirth" label="出生日期" width="150"></el-table-column>
                            <el-table-column fixed prop="sNativeplace" label="籍贯" width="100"></el-table-column>
                            <el-table-column fixed prop="sContact" label="联系方式" width="150"></el-table-column>
                            <el-table-column fixed prop="dNo" label="部门号" width="100"></el-table-column>
                            <el-table-column fixed prop="dName" label="部门名" width="150"></el-table-column>

                            <el-table-column fixed="right"
                                             label="操作"
                                             width="150">
                                <template slot-scope="scope">
                                    <el-button @click="startModifyStudentInfo(scope.row)" type="primary" round size="small">修改</el-button>
                                    <el-button type="danger" round size="small" @click="commitDeleteStudent(scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div>
                            总学生数：{{totalStudent}}
                        </div>

                    </el-tab-pane>

                    <el-tab-pane label="增加学生信息" name="secondS">

                        <el-form :model="addStudentForm" ref="addStudentForm"  class="demo-dynamic">
                            <el-form-item>
                                &nbsp;&nbsp;
                                <el-input v-model="showInfoAddStudent.sNo" class="cNoInputBox" :disabled="true"></el-input>
                                &nbsp;&nbsp;
                                <el-input v-model="showInfoAddStudent.sName" class="cNoInputBox" :disabled="true"></el-input>
                                &nbsp;&nbsp;
                                <el-input v-model="showInfoAddStudent.sSex" class="cNoInputBox" :disabled="true"></el-input>
                                &nbsp;&nbsp;
                                <el-input v-model="showInfoAddStudent.sBirth" class="dateInputBox" :disabled="true"></el-input>
                                &nbsp;&nbsp;
                                <el-input v-model="showInfoAddStudent.sNativeplace" class="cNoInputBox" :disabled="true"></el-input>
                                &nbsp;&nbsp;
                                <el-input v-model="showInfoAddStudent.sContact" class="cNoInputBox" :disabled="true"></el-input>
                                &nbsp;&nbsp;
                                <el-input v-model="showInfoAddStudent.dNo" class="cNoInputBox" :disabled="true"></el-input>
                                &nbsp;&nbsp;
                                <el-input v-model="showInfoAddStudent.mode" class="dateInputBox" :disabled="true"></el-input>
                            </el-form-item>

                            <el-form-item v-for="(data, index) in addStudentForm.data">
                                &nbsp;&nbsp;
                                <el-input v-model="data.sNo" class="cNoInputBox"></el-input>
                                &nbsp;&nbsp;
                                <el-input v-model="data.sName" class="cNoInputBox"></el-input>
                                &nbsp;&nbsp;

                                <el-select v-model="data.sSex" placeholder="请选择" class="cNoInputBox">
                                    <el-option label="男" value="男"></el-option>
                                    <el-option label="女" value="女"></el-option>
                                </el-select>
                                &nbsp;&nbsp;


                                <el-date-picker v-model="data.sBirth"
                                                type="date"
                                                class="cNoInputBox"
                                                value-format="yyyy-MM-dd"
                                                placeholder="选择日期">
                                </el-date-picker>

                                &nbsp;&nbsp;
                                <el-input v-model="data.sNativeplace" class="cNoInputBox"></el-input>
                                &nbsp;&nbsp;
                                <el-input v-model="data.sContact" class="cNoInputBox"></el-input>
                                &nbsp;&nbsp;

                                <el-select v-model="data.dNo" placeholder="请选择部门" class="cNoInputBox">
                                    <el-option v-for="(item,index) in allDepartmentInfoForm"
                                               :key="item.dNo"
                                               :label="item.dName"
                                               :value="item.dNo">
                                    </el-option>
                                </el-select>
                                &nbsp;&nbsp;
                                <el-input v-model="data.mode" class="dateInputBox" :disabled="true"></el-input>


                                <el-button @click.prevent="removeDomain(data)">删除输入栏</el-button>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="startAddStudent('addStudentForm')">提交</el-button>
                                <el-button @click="addDomain">新增输入栏</el-button>
                            </el-form-item>



                        </el-form>

                    </el-tab-pane>
                </el-tabs>
                

            </div>
            <!--这里是教师管理页面-->
            <div v-show="teacherManage">

                <el-tabs v-model="activeName">
                    <el-tab-pane label="修改教师信息" name="firstT">
                        <el-form :model="searchForm" ref="searchForm" label-width="100px" class="demo-dynamic">
                            <el-form-item label="搜索教师号：">
                                <el-input v-model="searchForm.tNo" class="cNoInputBox"></el-input>
                                <el-button @click.prevent="startSearch(1)">开始搜索</el-button>
                            </el-form-item>
                        </el-form>
                        <el-table :data="allTeacherInfoForm"
                                  border
                                  style="width: 1101px">
                            <el-table-column fixed prop="tNo" label="教师号" width="100"></el-table-column>
                            <el-table-column fixed prop="tName" label="姓名" width="150"></el-table-column>
                            <el-table-column fixed prop="tSex" label="性别" width="50"></el-table-column>
                            <el-table-column fixed prop="tBirth" label="出生日期" width="150"></el-table-column>
                            <el-table-column fixed prop="tXueli" label="职称" width="100"></el-table-column>
                            <el-table-column fixed prop="tSalary" label="月薪" width="150"></el-table-column>
                            <el-table-column fixed prop="dNo" label="部门号" width="100"></el-table-column>
                            <el-table-column fixed prop="dName" label="部门名" width="150"></el-table-column>

                            <el-table-column fixed="right"
                                             label="操作"
                                             width="150">
                                <template slot-scope="scope">
                                    <el-button @click="startModifyTeacherInfo(scope.row)" type="primary" round size="small">修改</el-button>
                                    <el-button type="danger" round size="small" @click="commitDeleteTeacher(scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div>
                            总教师数：{{totalTeacher}}
                        </div>

                    </el-tab-pane>
                    <el-tab-pane label="增加教师信息" name="secondT">
                        <el-form :model="addTeacherForm" ref="addTeacherForm" label-width="0px" class="demo-dynamic">
                            <el-form-item>
                                &nbsp;&nbsp;
                                <el-input v-model="showInfoAddTeacher.tNo" class="cNoInputBox" :disabled="true"></el-input>
                                &nbsp;&nbsp;
                                <el-input v-model="showInfoAddTeacher.tName" class="cNoInputBox" :disabled="true"></el-input>
                                &nbsp;&nbsp;
                                <el-input v-model="showInfoAddTeacher.tSex" class="cNoInputBox" :disabled="true"></el-input>
                                &nbsp;&nbsp;
                                <el-input v-model="showInfoAddTeacher.tBirth" class="dateInputBox" :disabled="true"></el-input>
                                &nbsp;&nbsp;
                                <el-input v-model="showInfoAddTeacher.tXueli" class="cNoInputBox" :disabled="true"></el-input>
                                &nbsp;&nbsp;
                                <el-input v-model="showInfoAddTeacher.tSalary" class="cNoInputBox" :disabled="true"></el-input>
                                &nbsp;&nbsp;
                                <el-input v-model="showInfoAddTeacher.tNo" class="cNoInputBox" :disabled="true"></el-input>
                                &nbsp;&nbsp;
                                <el-input v-model="showInfoAddTeacher.mode" class="dateInputBox" :disabled="true"></el-input>
                            </el-form-item>

                            <el-form-item v-for="(data, index) in addTeacherForm.data">
                                &nbsp;&nbsp;
                                <el-input v-model="data.tNo" class="cNoInputBox"></el-input>
                                &nbsp;&nbsp;
                                <el-input v-model="data.tName" class="cNoInputBox"></el-input>
                                &nbsp;&nbsp;

                                <el-select v-model="data.tSex" placeholder="请选择" class="cNoInputBox">
                                    <el-option label="男" value="男"></el-option>
                                    <el-option label="女" value="女"></el-option>
                                </el-select>
                                &nbsp;&nbsp;


                                <el-date-picker v-model="data.tBirth"
                                                type="date"
                                                class="cNoInputBox"
                                                value-format="yyyy-MM-dd"
                                                placeholder="选择日期">
                                </el-date-picker>

                                &nbsp;&nbsp;
                                <el-select v-model="data.tXueli" placeholder="请选择" class="cNoInputBox">
                                    <el-option label="教授" value="教授"></el-option>
                                    <el-option label="副教授" value="副教授"></el-option>
                                    <el-option label="讲师" value="讲师"></el-option>
                                    <el-option label="助教" value="助教"></el-option>
                                </el-select>
                                &nbsp;&nbsp;
                                <el-input v-model="data.tSalary" class="cNoInputBox"></el-input>
                                &nbsp;&nbsp;

                                <el-select v-model="data.dNo" placeholder="请选择部门" class="cNoInputBox">
                                    <el-option v-for="(item,index) in allDepartmentInfoForm"
                                               :key="item.dNo"
                                               :label="item.dName"
                                               :value="item.dNo">
                                    </el-option>
                                </el-select>
                                &nbsp;&nbsp;
                                <el-input v-model="data.mode" class="dateInputBox" :disabled="true"></el-input>


                                <el-button @click.prevent="removeDomainTeacher(data)">删除输入栏</el-button>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="startAddTeacher('addTeacherForm')">提交</el-button>
                                <el-button @click="addDomainTeacher">新增输入栏</el-button>
                            </el-form-item>



                        </el-form>

                    </el-tab-pane>
                </el-tabs>
            </div>
            <!--这里是课程管理页面-->
            <div v-show="classManage">

                <el-tabs v-model="activeName">
                    <el-tab-pane label="课程信息" name="firstC">
                        <el-form :model="searchForm" ref="searchForm" label-width="100px" class="demo-dynamic">
                            <el-form-item label="搜索课程：">
                                <el-input v-model="searchForm.cNo" class="cNoInputBox"></el-input>
                                <el-button @click.prevent="startSearch(2)">开始搜索</el-button>
                            </el-form-item>
                        </el-form>
                        <el-table :data="allClassInfoForm"
                                  border
                                  style="width: 701px">
                            <el-table-column fixed prop="cNo" label="课号" width="100"></el-table-column>
                            <el-table-column fixed prop="cName" label="课名" width="150"></el-table-column>
                            <el-table-column fixed prop="cCredit" label="学分" width="50"></el-table-column>
                            <el-table-column fixed prop="dNo" label="部门号" width="100"></el-table-column>
                            <el-table-column fixed prop="dName" label="部门名" width="150"></el-table-column>

                            <el-table-column fixed="right"
                                             label="操作"
                                             width="150">
                                <template slot-scope="scope">
                                    <el-button @click="startModifyClassInfo(scope.row)" type="primary" round size="small">修改</el-button>
                                    <el-button type="danger" round size="small" @click="commitDeleteClass(scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div>
                            总课程数：{{totalClass}}
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="增加课程" name="secondC">

                        <el-form :model="addClassForm" ref="addClassForm" class="demo-dynamic">
                            <el-form-item>
                                &nbsp;&nbsp;
                                <el-input v-model="showInfoAddClass.cNo" class="cNoInputBox" :disabled="true"></el-input>
                                &nbsp;&nbsp;
                                <el-input v-model="showInfoAddClass.cName" class="cNoInputBox" :disabled="true"></el-input>
                                &nbsp;&nbsp;
                                <el-input v-model="showInfoAddClass.cCredit" class="cNoInputBox" :disabled="true"></el-input>
                                &nbsp;&nbsp;
                                <el-input v-model="showInfoAddClass.dNo" class="cNoInputBox" :disabled="true"></el-input>
                                &nbsp;&nbsp;
                                <el-input v-model="showInfoAddClass.mode" class="dateInputBox" :disabled="true"></el-input>
                            </el-form-item>

                            <el-form-item v-for="(data, index) in addClassForm.data">
                                &nbsp;&nbsp;
                                <el-input v-model="data.cNo" class="cNoInputBox"></el-input>
                                &nbsp;&nbsp;
                                <el-input v-model="data.cName" class="cNoInputBox"></el-input>
                                &nbsp;&nbsp;
                                <el-input v-model="data.cCredit" class="cNoInputBox"></el-input>
                                &nbsp;&nbsp;
                                <el-select v-model="data.dNo" placeholder="请选择部门" class="cNoInputBox">
                                    <el-option v-for="(item,index) in allDepartmentInfoForm"
                                               :key="item.dNo"
                                               :label="item.dName"
                                               :value="item.dNo">
                                    </el-option>
                                </el-select>
                                &nbsp;&nbsp;
                                <el-input v-model="data.mode" class="dateInputBox" :disabled="true"></el-input>
                                <el-button @click.prevent="removeDomainClass(data)">删除输入栏</el-button>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="startAddClass">提交</el-button>
                                <el-button @click="addDomainClass">新增输入栏</el-button>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <!--这里是选课时间管理页面-->
            <div v-show="selectClassManage">
                <div class="selectTimeBox">
                    当前选课状态：
                    {{isSelectable}}
                    <el-button type="primary" @click="changeSelectStatus">{{enableX}}</el-button>
                </div>
                <div class="empty_space">这里是空格</div>
                <div class="selectTimeBox">
                    当前开课状态：
                    {{isOpenX}}
                    <el-button type="primary" @click="changeOpenStatus">{{openEnableX}}</el-button>
                </div>
                <div class="empty_space">这里是空格</div>
                <div>
                    <el-form ref="quarterInfoFormREF" :model="quarterInfoForm" :rules="quarterInfoFormRules" label-width="100px" class="login_form">
                        <!--UserName-->
                        <el-form-item label="选课学期" prop="thisQuarter">
                            <el-input v-model="quarterInfoForm.thisQuarter" class="dateInputBox"></el-input>
                        </el-form-item>
                        <!--PassWord-->
                        <el-form-item label="登分学期" prop="previousQuarter">
                            <el-input v-model="quarterInfoForm.previousQuarter" class="dateInputBox"></el-input>
                        </el-form-item>
                        <!--Button-->
                        <el-form-item class="btns">
                            <el-button type="primary" @click="commitTermModify">提交修改</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <!-- 这里是部门管理页面-->
            <div v-show="departmentManage">

                <el-tabs v-model="activeName">
                    <el-tab-pane label="修改部门信息" name="firstD">
                        <el-table :data="allDepartmentInfoForm"
                                  border
                                  style="width: 701px">

                            <el-table-column fixed prop="dNo" label="部门号" width="100"></el-table-column>
                            <el-table-column fixed prop="dName" label="部门名" width="150"></el-table-column>
                            <el-table-column fixed prop="dLocation" label="部门位置" width="150"></el-table-column>
                            <el-table-column fixed prop="dContact" label="联系方式" width="150"></el-table-column>

                            <el-table-column fixed="right"
                                             label="操作"
                                             width="150">
                                <template slot-scope="scope">
                                    <el-button @click="startModifyDepartmentInfo(scope.row)" type="primary" round size="small">修改</el-button>
                                    <el-button type="danger" round size="small" @click="commitDeleteDepartment(scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div>
                            总部门数：{{totalDepartment}}
                        </div>
                    </el-tab-pane>


                    <el-tab-pane label="增加部门信息" name="secondD">

                        <el-form :model="addDepartmentForm" ref="addDepartmentForm" class="demo-dynamic">
                            <el-form-item>
                                &nbsp;&nbsp;
                                <el-input v-model="showInfoAddDepartment.dNo" class="cNoInputBox" :disabled="true"></el-input>
                                &nbsp;&nbsp;
                                <el-input v-model="showInfoAddDepartment.dName" class="cNoInputBox" :disabled="true"></el-input>
                                &nbsp;&nbsp;
                                <el-input v-model="showInfoAddDepartment.dLocation" class="cNoInputBox" :disabled="true"></el-input>
                                &nbsp;&nbsp;
                                <el-input v-model="showInfoAddDepartment.dContact" class="cNoInputBox" :disabled="true"></el-input>
                                &nbsp;&nbsp;
                                <el-input v-model="showInfoAddDepartment.mode" class="dateInputBox" :disabled="true"></el-input>
                            </el-form-item>

                            <el-form-item v-for="(data, index) in addDepartmentForm.data">
                                &nbsp;&nbsp;
                                <el-input v-model="data.dNo" class="cNoInputBox"></el-input>
                                &nbsp;&nbsp;
                                <el-input v-model="data.dName" class="cNoInputBox"></el-input>
                                &nbsp;&nbsp;
                                <el-input v-model="data.dLocation" class="cNoInputBox"></el-input>
                                &nbsp;&nbsp;
                                <el-input v-model="data.dContact" class="cNoInputBox"></el-input>
                                &nbsp;&nbsp;
                                <el-input v-model="data.mode" class="dateInputBox" :disabled="true"></el-input>
                                <el-button @click.prevent="removeDomainDepartment(data)">删除输入栏</el-button>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="startAddDepartment">提交</el-button>
                                <el-button @click="addDomainDepartment">新增输入栏</el-button>
                            </el-form-item>
                        </el-form>

                    </el-tab-pane>
                </el-tabs>
            </div>

            <!--这里是开课管理界面-->
            <div v-show="configOpenClassManage">



                <el-tabs v-model="activeName" @tab-click="preModifyOpenClassInfo">
                    <!--这里是所有开课管理页面-->
                    <el-tab-pane label="所有开课" name="firstO">
                        <el-dropdown>
                            <span class="el-dropdown-link">
                                当前选择学期：{{selectTerm}}<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <template v-for="item in this.allTerm">
                                    <el-dropdown-item @click.native="selectTermMethod(item)">{{item}}</el-dropdown-item>
                                </template>

                            </el-dropdown-menu>
                        </el-dropdown>

                        <el-table :data="allOpenClassInfoForm"
                                  border
                                  style="width: 1001px">
                            <el-table-column fixed prop="cNo" label="课程号" width="100"></el-table-column>
                            <el-table-column fixed prop="cName" label="课程名" width="150"></el-table-column>
                            <el-table-column fixed prop="cCredit" label="学分" width="50"></el-table-column>
                            <el-table-column fixed prop="tNo" label="教师号" width="100"></el-table-column>
                            <el-table-column fixed prop="tName" label="授课老师" width="100"></el-table-column>
                            <el-table-column fixed prop="oTime" label="上课时间" width="150"></el-table-column>
                            <el-table-column fixed prop="oPlace" label="上课地点" width="150"></el-table-column>
                            <el-table-column fixed prop="oCurrentStudentCount" label="选课人数" width="100"></el-table-column>
                            <el-table-column fixed prop="oMaxStudentCount" label="课程容量" width="100"></el-table-column>

                        </el-table>
                        <div>
                            总开课数：{{totalOpenClass}}
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="设定开课" name="secondO">

                        <el-table :data="allClassInfoForm"
                                  border
                                  style="width: 701px">
                            <el-table-column fixed prop="cNo" label="课号" width="100"></el-table-column>
                            <el-table-column fixed prop="cName" label="课名" width="150"></el-table-column>
                            <el-table-column fixed prop="cCredit" label="学分" width="50"></el-table-column>
                            <el-table-column fixed prop="dNo" label="部门号" width="100"></el-table-column>
                            <el-table-column fixed prop="dName" label="部门名" width="150"></el-table-column>
                            <el-table-column fixed="right"
                                             label="操作"
                                             width="150">
                                <template slot-scope="scope">
                                    <div v-if="isOpen == 1">
                                        <el-button @click="startOpenClass(scope.row)" type="primary" round size="small">开课</el-button>
                                    </div>
                                    <div v-else>
                                        <el-button type="primary" round size="small" disabled>开课</el-button>
                                    </div>

                                </template>
                            </el-table-column>


                        </el-table>
                    </el-tab-pane>

                    <el-tab-pane label="开课信息修改" name="secondC">
                        <el-form :model="searchForm" ref="searchForm" label-width="100px" class="demo-dynamic">
                            <el-form-item label="输入课程号：">
                                <el-input v-model="searchForm.cNo" class="cNoInputBox"></el-input>

                            </el-form-item>
                            <el-form-item label="输入教师号：">
                                <el-input v-model="searchForm.tNo" class="cNoInputBox"></el-input>
                            </el-form-item>
                            <el-form-item >
                                <el-button @click.prevent="startSearch(3)">开始搜索</el-button>
                            </el-form-item>
                            
                        </el-form>
                        <el-table :data="allOpenClassInfoForm"
                                  border
                                  style="width: 1151px">
                            <el-table-column fixed prop="cNo" label="课程号" width="100"></el-table-column>
                            <el-table-column fixed prop="cName" label="课程名" width="150"></el-table-column>
                            <el-table-column fixed prop="cCredit" label="学分" width="50"></el-table-column>
                            <el-table-column fixed prop="tNo" label="教师号" width="100"></el-table-column>
                            <el-table-column fixed prop="tName" label="授课老师" width="100"></el-table-column>
                            <el-table-column fixed prop="oTime" label="上课时间" width="150"></el-table-column>
                            <el-table-column fixed prop="oPlace" label="上课地点" width="150"></el-table-column>
                            <el-table-column fixed prop="oCurrentStudentCount" label="选课人数" width="100"></el-table-column>
                            <el-table-column fixed prop="oMaxStudentCount" label="课程容量" width="100"></el-table-column>
                            <el-table-column fixed="right"
                                             label="操作"
                                             width="150">
                                <template slot-scope="scope">
                                    <el-button @click="startModifyOpenClassInfo(scope.row)" type="primary" round size="small">修改</el-button>
                                    <el-button type="danger" round size="small" @click="commitDeleteOpenClass(scope.row)">删除</el-button>
                                </template>
                            </el-table-column>

                        </el-table>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <!--这里是个人中心页面-->
            <div v-show="userCenterPage">

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
            <div v-show="selectClassPage">
                <!--这里是选课页面-->
                正在为{{currentTerm}}学期选课
                <el-form :model="selectClassForm" ref="selectClassForm" label-width="100px" class="demo-dynamic">
                    <el-form-item label="请输入学号">
                        <el-input v-model="selectClassForm.userName" class="cNoInputBox"></el-input>
                    </el-form-item>
                    <el-form-item v-for="(domain, index) in selectClassForm.domains" :label="'课程' + index">
                        <el-input v-model="domain.cNo" class="cNoInputBox"></el-input>
                        教师号：
                        <el-input v-model="domain.tNo" class="cNoInputBox"></el-input>
                        <el-button @click.prevent="removeDomainSelectClass(domain)">删除</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitFormSelectClass('selectClassForm')">提交</el-button>
                        <el-button @click="addDomainSelectClass">新增课程</el-button>
                        <el-button @click="resetForm('selectClassForm')">重置</el-button>
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
                totalStudent: 0, totalTeacher: 0, totalClass: 0,totalOpenClass:0,totalDepartment:0,
                searchForm: { cNo: '', tNo:'',sNo:'',dNo:''},
                quarterInfoForm: { thisQuarter: '', previousQuarter: '' },
                quarterInfoFormRules: {
                    thisQuarter: [{ required: true, message: '请输入当前选课学期', trigger: 'blur' },],
                    previousQuarter: [{ required: true, message: '请输入当前登分学期', trigger: 'blur' },]
                },
                passwordForm: {
                    oldPassword: '',
                    newPassword2: '',
                    newPassword: '',
                },

                selectClassForm: {
                    domains: [{ cNo: '', tNo: '', }],
                    userName: '',
                    mode: 'selectClass',
                    term: 'PlaceHolder'
                },
                selectResultData: [],

                allTerm: ['2018-2019秋季', '2018-2019冬季', '2018-2019春季', '2019-2020秋季', '2019-2020冬季', '2019-2020春季', '2020-2021秋季'],
                currentTerm: window.sessionStorage.getItem('currentTerm'),
                selectTerm: window.sessionStorage.getItem('currentTerm'),

                addStudentForm: {data: [{ sNo: '', sName: '', sSex: '', sBirth: '', sNativeplace: '', sContact: '', dNo: '', mode:''}],},
                addDepartmentForm: {data: [{ dNo: '', dName:'',dLocation:'',dContact:'',mode:''}],},
                addTeacherForm: {data: [{ tNo: '', tName: '', tSex: '', tBirth: '', tXueli: '', tSalary: '', dNo: '', mode: '' }],},
                addClassForm: { data: [{ cNo: '', cName: '', cCredit: '', dNo: '', mode: '' }], },
                classTime: { data: [{cT:'',cTstart:'',cTend:''}]},

                showInfoAddDepartment: { dNo: '部门号', dName: '部门名', dLocation: '部门位置', dContact: '联系方式',mode:'操作状态'},
                showInfoAddStudent: { sNo: '学号', sName: '姓名', sSex: '性别', sBirth: '出生日期', sNativeplace: '籍贯', sContact: '联系方式', dNo: '部门', mode:'操作状态'},
                showInfoAddTeacher: { tNo: '教师号', tName: '姓名', tSex: '性别', tBirth: '出生日期', tXueli: '职称', tSalary: '月薪', dNo: '部门',mode: '操作状态' },
                showInfoAddClass: { cNo: '课程号', cName: '课程名', dNo: '部门', cCredit: '学分', mode: '操作状态' },

                activeName: 'firstT',
                sendContent: { Mode: 'getSelectTime' },

                allStudentInfoForm: [],
                allDepartmentInfoForm: [],
                allTeacherInfoForm: [],
                allClassInfoForm: [],
                allOpenClassInfoForm: [],
                
                
                sendContent1: { Mode: 'setSelectTime' },
                UserNameX: window.sessionStorage.getItem('Username'),
                temp: '',
                isSelectable: '选课开放',
                enableX: '关闭选课',
                isOpen: '',
                isOpenX: '开课功能开放',
                openEnableX:'关闭开课功能',
                
                studentModifyForm: {sNo: '',sName: '',sSex: '',sBirth: '',sNativeplace: '',sContact: '',dNo:'',},
                departmentModifyForm: { dNo: '', dName: '', dContact: '', dLocation: '' },
                teacherModifyForm: { tNo: '', tName: '', tSex: '', tBirth: '', tXueli: '', tSalary: '', dNo: '' },
                classModifyForm: { cNo: '', cName: '', cCredit: '', dNo: '' },
                openClassModifyForm: {cNo:'',oTime:'',oPlace:'',oMaxStudentCount:'',oTerm:'',oCurrentStudentCount:''},
                openClassForm: {cNo:'',tNo:'',oTerm:'',oTime:'',oPlace:'',oMaxStudentCount:''},

                dialogFormVisible: false,
                dialogDepartmentFormVisible: false,
                dialogTeacherFormVisible: false,
                dialogClassFormVisible: false,
                dialogOpenFormVisible: false,
                dialogOpenFormModifyVisible: false,
                selectResultVisible:false,

                formLabelWidth: '120px',
                studentManage: false,
                teacherManage: false,
                classManage: false,
                selectClassManage: false, 
                departmentManage: false,
                configOpenClassManage: false,
                userCenterPage: false,
                selectClassPage: false,

                currentPage1: 5,
                currentPage2: 5,
                currentPage3: 5,
                currentPage4: 4,
                
            }
        },

        mounted: function () {
            //console.log('START'[0]);
            this.getOpenClassInfo();
            this.getClassInfo();
            this.getDepartmentInfo();
            this.getTeacherInfo();
            this.getTermInfo();
            
            
            document.title = '管理员主页';
           
            
        },

        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            handleClick(row) {
                console.log(row);
            },
            commitOpenClass() {
                
                var temp='';
                for (var item in this.classTime.data) {
                    //console.log(this.classTime.data[item]);
                    temp = temp + ' ' + String(this.classTime.data[item].cT) + String(this.classTime.data[item].cTstart) + '-' + String(this.classTime.data[item].cTend);
                }
                this.openClassForm.oTime = String(temp);
                this.openClassForm.oTerm = this.currentTerm;
                var sendData = { mode: 'commitNewOpenClass', newOpenClassList: [this.openClassForm] }
                //console.log(this.openClassForm);
                const result = this.$http.post('http://172.46.100.69:7780/admin', sendData).then(res => {
                    if (res.data.newOpenClassList[0].mode == '开课成功！') {
                        //this.getClassInfo();
                        this.$message.success('开课成功！');
                        this.dialogOpenFormVisible = false;
                    }
                    else {
                        this.$message.error(res.data.newOpenClassList[0].mode);
                    }
                });
            },
            submitFormSelectClass(formName) {
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
                    this.selectResultVisible = true;
                });




            },

            startChangePassword() {
                var sendData = { userName: this.UserNameX, mode: 'changePassword', oldPassword: '', newPassword: '' };
                if (this.passwordForm.newPassword != this.passwordForm.newPassword2) return this.$message.error('两次密码输入不一致！');
                sendData.oldPassword = this.$md5(this.passwordForm.oldPassword);
                sendData.newPassword = this.$md5(this.passwordForm.newPassword);
                //var test = this.$md5(sendData.newPassword);
                //console.log(test);
                const result = this.$http.post('http://172.46.100.69:7780/admin', sendData).then(res => {
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

            commitOpenClassModify() {
                console.log(this.openClassModifyForm);
                this.openClassModifyForm.oTerm = this.currentTerm;
                var temp = '';
                for (var item in this.classTime.data) {
                    //console.log(this.classTime.data[item]);
                    temp = temp + ' ' + String(this.classTime.data[item].cT) + String(this.classTime.data[item].cTstart) + '-' + String(this.classTime.data[item].cTend);
                }
                this.openClassModifyForm.oTime = String(temp);
                var sendData = { mode: 'modifyOpenClassInfo', modifyData: this.openClassModifyForm };
                const result = this.$http.post('http://172.46.100.69:7780/admin', sendData).then(res => {
                    if (res.data.result == '修改成功！') {
                        this.$message({ type: 'success', message: '修改成功!' });
                        this.dialogOpenFormModifyVisible = false;
                        this.getOpenClassInfo();
                    }
                    else {
                        this.$message({ type: 'error', message: res.data.result, });
                    };

                });
                
            },
            commitDepartmentInfoModify() {
                
                var sendData = { mode: "modifyDepartmentInfo", modifyData: this.departmentModifyForm };
                //console.log(sendData);
                const result = this.$http.post('http://172.46.100.69:7780/admin', sendData).then(res => {
                    if (res.data.result == '修改成功！') {
                        this.$message({ type: 'success', message: '修改成功!' });
                        this.dialogDepartmentFormVisible = false;
                        this.getDepartmentInfo();
                    }
                    else {
                        this.$message({ type: 'error', message: res.data.result, });
                    };
                    
                });
            },
            commitStudentInfoModify() {

                var sendData = { mode: "modifyStudentInfo", modifyData: this.studentModifyForm };
                //console.log(this.studentModifyForm);
                const result = this.$http.post('http://172.46.100.69:7780/admin', sendData).then(res => {
                    if (res.data.result == '修改成功！') {
                        this.$message({ type: 'success', message: '修改成功!' });
                        this.dialogFormVisible = false;
                        this.setStudentManage();
                    }
                    else {
                        this.$message({ type: 'error', message: res.data.result, });
                    };

                });
            },
            commitTermModify() {
                this.$refs.quarterInfoFormREF.validate(valid => {
                    if (!valid) {
                        this.$message.error('请输入正确的学期信息！');
                        return;
                    };

                    var sendData = { Mode: "setTerm", oTerm: this.quarterInfoForm.thisQuarter, previousTerm: this.quarterInfoForm.previousQuarter };
                    //console.log(this.studentModifyForm);
                    const result = this.$http.post('http://172.46.100.69:7777/login', sendData).then(res => {
                        if (res.data.result == '修改成功') {
                            this.$message({ type: 'success', message: '修改成功!' });
                        }
                        else {
                            this.$message({ type: 'error', message: res.data.result, });
                        };

                    });
                });
            },
            commitTeacherInfoModify() {

                var sendData = { mode: "modifyTeacherInfo", modifyData: this.teacherModifyForm };
                //console.log(sendData);
                const result = this.$http.post('http://172.46.100.69:7780/admin', sendData).then(res => {
                    if (res.data.result == '修改成功！') {
                        this.$message({ type: 'success', message: '修改成功!' });
                        this.dialogTeacherFormVisible = false;
                        this.getTeacherInfo();
                    }
                    else {
                        this.$message({ type: 'error', message: res.data.result, });
                    };

                });
            },
            commitClassInfoModify() {

                var sendData = { mode: "modifyClassInfo", modifyData: this.classModifyForm };
                //console.log(sendData);
                const result = this.$http.post('http://172.46.100.69:7780/admin', sendData).then(res => {
                    if (res.data.result == '修改成功！') {
                        this.$message({ type: 'success', message: '修改成功!' });
                        this.dialogClassFormVisible = false;
                        this.getClassInfo();
                    }
                    else {
                        this.$message({ type: 'error', message: res.data.result, });
                    };

                });
            },

            preModifyOpenClassInfo() {
                //console.log('la');
                var sendData = { mode: 'openClassInfo', oTerm: this.currentTerm };
                this.allOpenClassInfoForm = [];
                const result = this.$http.post('http://172.46.100.69:7780/admin', sendData).then(res => {
                    for (var item in res.data.openClassInfo) {
                        this.allOpenClassInfoForm.push(res.data.openClassInfo[item]);
                    };
                    //console.log(this.allOpenClassInfoForm);
                });

            },

            startModifyOpenClassInfo(row) {
                //console.log(row);
                this.classTime.data = [];
                this.dialogOpenFormModifyVisible = true;
                this.openClassModifyForm.cNo = row.cNo;
                this.openClassModifyForm.tNo = row.tNo;
                //console.log(row.timeList);
                for (var item in row.timeList) {
                    var temp = { cT: '', cTstart: '', cTend: '' };
                    temp.cT = row.timeList[item][0];
                    row.timeList[item] = row.timeList[item].replace(/[ABCDE]/i, "");
                    var tempList = row.timeList[item].split('-');
                    temp.cTstart = tempList[0];
                    temp.cTend = tempList[1];
                    //console.log(temp);
                    this.classTime.data.push(temp);
                }
                this.openClassModifyForm.oPlace = row.oPlace;
                this.openClassModifyForm.oTime = row.oTime;
                this.openClassModifyForm.oMaxStudentCount = row.oMaxStudentCount;
                this.openClassModifyForm.oCurrentStudentCount = row.oCurrentStudentCount;


            },

            startModifyDepartmentInfo(row) {
                //console.log(row);
                this.dialogDepartmentFormVisible = true;
                this.departmentModifyForm.dNo = row.dNo;
                this.departmentModifyForm.dName = row.dName;
                this.departmentModifyForm.dContact = row.dContact;
                this.departmentModifyForm.dLocation = row.dLocation;
            },
            startModifyStudentInfo(row) {
                //console.log(row);
                this.dialogFormVisible = true;
                this.studentModifyForm.sNo = row.sNo;
                this.studentModifyForm.sName = row.sName;
                this.studentModifyForm.sSex = row.sSex;
                this.studentModifyForm.sBirth = row.sBirth;
                this.studentModifyForm.sNativeplace = row.sNativeplace;
                this.studentModifyForm.sContact = row.sContact;
                this.studentModifyForm.dNo = row.dNo;
            },
            startSearch(mode) {
                //console.log(row);
                if (mode == 0) {
                    //console.log(111);
                    for (var item in this.allStudentInfoForm) {
                        if (this.allStudentInfoForm[item].sNo == this.searchForm.sNo) {
                            this.dialogFormVisible = true;
                            this.studentModifyForm.sNo = this.allStudentInfoForm[item].sNo;
                            this.studentModifyForm.sName = this.allStudentInfoForm[item].sName;
                            this.studentModifyForm.sSex = this.allStudentInfoForm[item].sSex;
                            this.studentModifyForm.sBirth = this.allStudentInfoForm[item].sBirth;
                            this.studentModifyForm.sNativeplace = this.allStudentInfoForm[item].sNativeplace;
                            this.studentModifyForm.sContact = this.allStudentInfoForm[item].sContact;
                            this.studentModifyForm.dNo = this.allStudentInfoForm[item].dNo;
                            return;
                        }
                    }
                    this.$message.error('没有搜索到该学生');
                };
                if (mode == 1) {
                    //console.log(111);
                    for (var item in this.allTeacherInfoForm) {
                        if (this.allTeacherInfoForm[item].tNo == this.searchForm.tNo) {
                            this.dialogTeacherFormVisible = true;
                            this.teacherModifyForm.tNo = this.allTeacherInfoForm[item].tNo;
                            this.teacherModifyForm.tName = this.allTeacherInfoForm[item].tName;
                            this.teacherModifyForm.tSex = this.allTeacherInfoForm[item].tSex;
                            this.teacherModifyForm.tBirth = this.allTeacherInfoForm[item].tBirth;
                            this.teacherModifyForm.tXueli = this.allTeacherInfoForm[item].tXueli;
                            this.teacherModifyForm.tSalary = this.allTeacherInfoForm[item].tSalary;
                            this.teacherModifyForm.dNo = this.allTeacherInfoForm[item].dNo;
                            return;
                        }
                    }
                    this.$message.error('没有搜索到该教师');
                };
                if (mode == 2) {
                    //console.log(111);
                    for (var item in this.allClassInfoForm) {
                        if (this.allClassInfoForm[item].cNo == this.searchForm.cNo) {
                            this.dialogClassFormVisible = true;
                            this.classModifyForm.cNo = this.allClassInfoForm[item].cNo;
                            this.classModifyForm.cName = this.allClassInfoForm[item].cName;
                            this.classModifyForm.cCredit = this.allClassInfoForm[item].cCredit;
                            this.classModifyForm.dNo = this.allClassInfoForm[item].dNo;
                            return;
                        }
                    }
                    this.$message.error('没有搜索到该课程');
                };
                if (mode == 3) {
                    //console.log(this.allOpenClassInfoForm);
                    for (var item in this.allOpenClassInfoForm) {
                        //console.log(allOpenClassInfoForm[item]);
                        if (this.allOpenClassInfoForm[item].cNo == this.searchForm.cNo && this.allOpenClassInfoForm[item].tNo == this.searchForm.tNo) {

                            this.classTime.data = [];
                            this.dialogOpenFormModifyVisible = true;
                            this.openClassModifyForm.cNo = this.allOpenClassInfoForm[item].cNo;
                            this.openClassModifyForm.tNo = this.allOpenClassInfoForm[item].tNo;
                            //console.log(row.timeList);
                            for (var item in this.allOpenClassInfoForm[item].timeList) {
                                var temp = { cT: '', cTstart: '', cTend: '' };
                                temp.cT = this.allOpenClassInfoForm[item].timeList[item][0];
                                this.allOpenClassInfoForm[item].timeList[item] = this.allOpenClassInfoForm[item].timeList[item].replace(/[ABCDE]/i, "");
                                var tempList = this.allOpenClassInfoForm[item].timeList[item].split('-');
                                temp.cTstart = tempList[0];
                                temp.cTend = tempList[1];
                                //console.log(temp);
                                this.classTime.data.push(temp);
                            }
                            this.openClassModifyForm.oPlace = this.allOpenClassInfoForm[item].oPlace;
                            this.openClassModifyForm.oTime = this.allOpenClassInfoForm[item].oTime;
                            this.openClassModifyForm.oMaxStudentCount = this.allOpenClassInfoForm[item].oMaxStudentCount;
                            this.openClassModifyForm.oCurrentStudentCount = this.allOpenClassInfoForm[item].oCurrentStudentCount;
                            return;
                        }
                    }
                    this.$message.error('没有搜索到该开课信息');
                };

            },
            startModifyTeacherInfo(row) {
                //
                this.dialogTeacherFormVisible = true;
                this.teacherModifyForm.tNo = row.tNo;
                this.teacherModifyForm.tName = row.tName;
                this.teacherModifyForm.tSex = row.tSex;
                this.teacherModifyForm.tBirth = row.tBirth;
                this.teacherModifyForm.tXueli = row.tXueli;
                this.teacherModifyForm.tSalary = row.tSalary;
                this.teacherModifyForm.dNo = row.dNo;
                //console.log(this.teacherModifyForm);
            },
            startModifyClassInfo(row) {
                //
                this.dialogClassFormVisible = true;
                this.classModifyForm.cNo = row.cNo;
                this.classModifyForm.cName = row.cName;
                this.classModifyForm.cCredit = row.cCredit;
                this.classModifyForm.dNo = row.dNo;
                //console.log(this.teacherModifyForm);
            },
            startOpenClass(row) {
                //
                this.openClassForm = { cNo: '', tNo: '', oTerm: '', oTime: '', oPlace: '', oMaxStudentCount: '' };
                this.dialogOpenFormVisible = true;
                this.openClassForm.cNo = row.cNo;
                this.openClassForm.cName = row.cName;
                this.openClassForm.cCredit = row.cCredit;
                this.classTime.data = [{ cT: '' }];

                //console.log(this.teacherModifyForm);
            },
           
            commitDeleteStudent(row) {
                //console.log(row.sNo);
                var sendData = { mode: 'deleteStudent', sNo: row.sNo };

                this.$confirm('此操作将永久删除该学生, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    const result = this.$http.post('http://172.46.100.69:7780/admin', sendData).then(res => {
                        //console.log(res.data.result);
                        if (res.data.result == '删除成功！') {
                            this.$message({ type: 'success', message: '删除成功!' });
                            this.setStudentManage();
                            
                        }
                        else {
                            this.$message({type: 'error', message: res.data.result,});
                        };
                        

                    });
                    
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            commitDeleteTeacher(row) {
                //console.log(row.sNo);
                var sendData = { mode: 'deleteTeacher', tNo: row.tNo };

                this.$confirm('此操作将永久删除该教师, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    const result = this.$http.post('http://172.46.100.69:7780/admin', sendData).then(res => {
                        //console.log(res.data.result);
                        if (res.data.result == '删除成功！') {
                            this.$message({ type: 'success', message: '删除成功!' });
                            this.getTeacherInfo();
                        }
                        else {
                            this.$message({ type: 'error', message: res.data.result, });
                        };


                    });

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            commitDeleteDepartment(row) {
                console.log(row.dNo);
                var sendData = { mode: 'deleteDepartment', dNo: row.dNo };

                this.$confirm('此操作将永久删除该部门, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    const result = this.$http.post('http://172.46.100.69:7780/admin', sendData).then(res => {
                        //console.log(res.data.result);
                        if (res.data.result == '删除成功！') {
                            this.$message({ type: 'success', message: '删除成功!' });
                            this.getDepartmentInfo();
                        }
                        else {
                            this.$message({ type: 'error', message: res.data.result, });
                        };


                    });

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            commitDeleteClass(row) {
                //console.log(row.sNo);
                var sendData = { mode: 'deleteClass', cNo: row.cNo };

                this.$confirm('此操作将永久删除该课程, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    const result = this.$http.post('http://172.46.100.69:7780/admin', sendData).then(res => {
                        //console.log(res.data.result);
                        if (res.data.result == '删除成功！') {
                            this.$message({ type: 'success', message: '删除成功!' });
                            this.getClassInfo();
                        }
                        else {
                            this.$message({ type: 'error', message: res.data.result, });
                        };


                    });

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            commitDeleteOpenClass(row) {
                //console.log(row.sNo);
                var sendData = { mode: 'deleteOpenClass', cNo: row.cNo, tNo: row.tNo, oTerm: this.currentTerm };

                this.$confirm('此操作将取消该课程在本学期的开课, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    const result = this.$http.post('http://172.46.100.69:7780/admin', sendData).then(res => {
                        //console.log(res.data.result);
                        if (res.data.result == '删除成功！') {
                            this.$message({ type: 'success', message: '取消成功!' });
                            this.preModifyOpenClassInfo();
                        }
                        else {
                            this.$message({ type: 'error', message: res.data.result, });
                        };


                    });

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            startAddTeacher(formName) {
                //console.log(this.addStudentForm.data)
                var sendData = { mode: 'commitNewTeacher', newTeacherList: this.addTeacherForm.data }

                const result = this.$http.post('http://172.46.100.69:7780/admin', sendData).then(res => {
                    console.log(res.data);
                    this.addTeacherForm.data = [];
                    for (var item in res.data.newTeacherList) {
                        console.log(res.data.newTeacherList[item]);
                        this.addTeacherForm.data.push(res.data.newTeacherList[item]);
                    }
                    this.getTeacherInfo();
                    this.$message.info('已提交，请检查操作状态！')
                });
            },
            startAddStudent(formName) {
                //console.log(this.addStudentForm.data)
                var sendData = { mode: 'commitNewStudent', newStudentList: this.addStudentForm.data }
                
                const result = this.$http.post('http://172.46.100.69:7780/admin', sendData).then(res => {
                    console.log(res.data);
                    this.addStudentForm.data = [];
                    for (var item in res.data.newStudentList) {
                        console.log(res.data.newStudentList[item]);
                        this.addStudentForm.data.push(res.data.newStudentList[item]);
                    }
                    //console.log(this.addStudentForm.data)
                    this.$message.info('已提交，请检查操作状态！')
                });
            },
            startAddDepartment() {
                //console.log(this.addClassForm.data)
                var sendData = { mode: 'commitNewDepartment', newDepartmentList: this.addDepartmentForm.data }

                const result = this.$http.post('http://172.46.100.69:7780/admin', sendData).then(res => {
                    console.log(res.data);
                    this.addDepartmentForm.data = [];
                    for (var item in res.data.newDepartmentList) {
                        console.log(res.data.newDepartmentList[item]);
                        this.addDepartmentForm.data.push(res.data.newDepartmentList[item]);
                    }
                    this.getDepartmentInfo();
                    this.$message.info('已提交，请检查操作状态！')
                });
            },
            startAddClass() {
                console.log(this.addClassForm.data)
                var sendData = { mode: 'commitNewClass', newClassList: this.addClassForm.data }

                const result = this.$http.post('http://172.46.100.69:7780/admin', sendData).then(res => {
                    console.log(res.data);
                    this.addClassForm.data = [];
                    for (var item in res.data.newClassList) {
                        console.log(res.data.newClassList[item]);
                        this.addClassForm.data.push(res.data.newClassList[item]);
                    }
                    this.getClassInfo();
                    this.$message.info('已提交，请检查操作状态！')
                });
            },


            hideAll() {
                this.studentManage = false;
                this.teacherManage = false;
                this.classManage = false;
                this.selectClassManage = false;
                this.departmentManage = false;
                this.configOpenClassManage = false;
                this.userCenterPage = false;
                this.selectClassPage = false;
            },

            setSelectClass() {
                this.hideAll();
                
                this.selectClassPage = true;
            },

            setTeacherManage() {
                this.hideAll();
                this.activeName = 'firstT';
                this.teacherManage = true;
                this.getTeacherInfo();
                //this.getDepartmentInfo();
            },
            setClassManage() {
                this.hideAll();
                this.classManage = true;
                this.activeName = 'firstC';
               // this.getTeacherInfo();
               //this.getDepartmentInfo();
               this.getClassInfo();
            },
            setStudentManage() {
                this.hideAll();
                this.activeName = 'firstS';
                //this.getDepartmentInfo();
                this.studentManage = true;
                var sendData = { mode: 'studentInfo' };
                this.allStudentInfoForm = [];
                const result = this.$http.post('http://172.46.100.69:7780/admin', sendData).then(res => {
                    for (var item in res.data.studentInfo) {
                        this.allStudentInfoForm.push(res.data.studentInfo[item]);
                    };
                    this.totalStudent = this.allStudentInfoForm.length;
                    //console.log(this.allStudentInfoForm);
                });
            },
            setDepartmentManage() {
                this.hideAll();
                this.activeName = 'firstD';
                this.departmentManage = true;
                this.getDepartmentInfo();
            },
            goUserCenter() {
                this.hideAll();
                this.userCenterPage = true;

            },
            setSelectTime() {
                this.hideAll();
                this.selectClassManage = true;
                //this.$message.message('rua');
                const result = this.$http.post('login', this.sendContent).then(res => {
                    if (res.data.result == 0) {
                        this.isSelectable = '选课系统关闭';
                        this.enableX = '立即开放选课';
                    }
                    if (res.data.result == 1) {
                        this.isSelectable = '选课系统开放';
                        this.enableX = '立即关闭选课';

                    }

                });
            },
            setConfigOpenClassManage() {
                this.hideAll();
                this.activeName = 'firstO'
                this.configOpenClassManage = true;
                this.getOpenClassInfo();
                var sendData = { Mode: 'getOpenTime' };
                const result = this.$http.post('http://172.46.100.69:7777/login', sendData).then(res => {
                    this.isOpen = res.data.result;
                    if (this.isOpen == 1) {
                        this.isOpenX = '开课功能开放';
                        this.openEnableX = '关闭开课功能';
                    }
                    else {
                        this.isOpenX = '开课功能关闭';
                        this.openEnableX = '开启开课功能';
                    };

                    //this.isOpen = 1;
                });

                
                
            },
            getTermInfo() {
                var sendData = { Mode: 'getTerm' };
                const result = this.$http.post('http://172.46.100.69:7777/login', sendData).then(res => {
                    console.log(res.data);
                    this.quarterInfoForm.thisQuarter = res.data.oTerm;
                    this.quarterInfoForm.previousQuarter = res.data.previousTerm;
                });
            },
            getClassInfo() {
                var sendData = { mode: 'classInfo' };
                this.allClassInfoForm = [];
                const result = this.$http.post('http://172.46.100.69:7780/admin', sendData).then(res => {
                    for (var item in res.data.classInfo) {
                        this.allClassInfoForm.push(res.data.classInfo[item]);
                    };
                    this.totalClass = this.allClassInfoForm.length;
                    
                    //console.log(this.allClassInfoForm);
                });
            },
            getTeacherInfo() {
                var sendData = { mode: 'teacherInfo' };
                this.allTeacherInfoForm = [];
                const result = this.$http.post('http://172.46.100.69:7780/admin', sendData).then(res => {
                    for (var item in res.data.teacherInfo) {
                        this.allTeacherInfoForm.push(res.data.teacherInfo[item]);
                    };
                    this.totalTeacher = this.allTeacherInfoForm.length;

                    
                    //console.log(this.allStudentInfoForm);
                });
            },
            getDepartmentInfo() {
                var sendData = { mode: 'departmentInfo' };
                this.allDepartmentInfoForm = [];
                const result = this.$http.post('http://172.46.100.69:7780/admin', sendData).then(res => {
                    for (var item in res.data.departmentInfo) {
                        this.allDepartmentInfoForm.push(res.data.departmentInfo[item]);
                    };
                    this.totalDepartment = this.allDepartmentInfoForm.length;
                    
                    //console.log(this.allStudentInfoForm);
                });
            },
            getOpenClassInfo() {
                //console.log('AAA');
                var sendData = { mode: 'openClassInfo', oTerm: this.selectTerm };
                this.allOpenClassInfoForm = [];
                const result = this.$http.post('http://172.46.100.69:7780/admin', sendData).then(res => {
                    for (var item in res.data.openClassInfo) {
                        this.allOpenClassInfoForm.push(res.data.openClassInfo[item]);
                    };
                    this.totalOpenClass = this.allOpenClassInfoForm.length;
                    //console.log(this.allOpenClassInfoForm);
                });
            },
            
           
            exit() {
                window.sessionStorage.removeItem('token');
                this.$router.push('/login');
            },
            
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },

            removeDomain(item) {
                var index = this.addStudentForm.data.indexOf(item)
                if (index !== -1) {
                    this.addStudentForm.data.splice(index, 1)
                }
            },
            removeDomainDepartment(item) {

                var index = this.addDepartmentForm.data.indexOf(item)
                if (index !== -1) {
                    this.addDepartmentForm.data.splice(index, 1)
                }
            },
            removeDomainTeacher(item) {

                var index = this.addTeacherForm.data.indexOf(item)
                if (index !== -1) {
                    this.addTeacherForm.data.splice(index, 1)
                }
            },
            removeDomainClass(item) {

                var index = this.addClassForm.data.indexOf(item)
                if (index !== -1) {
                    this.addClassForm.data.splice(index, 1)
                }
            },
            removeDomainClassTime(item) {

                var index = this.classTime.data.indexOf(item)
                if (index !== 0) {
                    this.classTime.data.splice(index, 1)
                }
            },
            removeDomainSelectClass(item) {

                var index = this.selectClassForm.domains.indexOf(item)
                if (index !== 0) {
                    this.selectClassForm.domains.splice(index, 1)
                }
            },

            addDomainSelectClass() {
                this.selectClassForm.domains.push({
                    cNo: '',
                    tNo: '',
                });
            },

            addDomain() {
                this.addStudentForm.data.push({
                    sNo: '',
                    sName: '',
                    sSex: '',
                    sBirth: '',
                    sNativeplace: '',
                    sContact: '',
                    dNo: '',
                    mode:'',
                });
            },
            addDomainDepartment() {
                this.addDepartmentForm.data.push({
                    dNo: '',
                    dName: '',
                    dContact: '',
                    dLocation: '',
                    mode: '',
                });
            },
            addDomainClass() {
                this.addClassForm.data.push({
                    cNo: '',
                    cName: '',
                    dNo: '',
                    cCredit: '',
                    mode: '',
                });
            },
            addDomainClassTime() {
                this.classTime.data.push({ cT: '', cTstart: '', cTend:'' });
            },
            addDomainTeacher() {
                this.addTeacherForm.data.push({tNo: '', tName: '', tSex: '', tBirth: '', tXueli: '', tSalary: '', dNo: '', mode: ''});
            },

            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },

           
            changeSelectStatus() {
                this.$http.post('login', this.sendContent1).then(ress => {
                    if (ress.data.result == 'ok-1') {
                        this.isSelectable = '选课系统开放';
                        this.enableX = '立即关闭选课';
                        this.$message.success('成功开放选课！');
                    }
                    if (ress.data.result == 'ok-0') {
                        this.isSelectable = '选课系统关闭';
                        this.enableX = '立即开放选课';
                        this.$message.success('成功关闭选课！');
                    }
                        
                    
                })
            },
            changeOpenStatus() {
                var sendData = {Mode:'setOpenTime'}
                this.$http.post('login', sendData).then(ress => {
                    if (ress.data.result == 'ok-1') {
                        this.isOpenX = '开课功能开放';
                        this.openEnableX = '关闭开课功能';
                        this.$message.success('成功开放开课功能！');
                    }
                    if (ress.data.result == 'ok-0') {
                        this.isOpenX = '开课功能关闭';
                        this.openEnableX = '开启开课功能';
                        this.$message.success('成功关闭开课功能！');
                    }


                })
            },
            selectTermMethod(data) {
                this.selectTerm = data;
                this.getOpenClassInfo();

            },
            
            
            

        },

        
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
        width: 250px;
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
    .dateInputBox{
        width:220px;
    }
    .classTimeInputBox {
        width: 100px;
    }
    .name {
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .addr {
        font-size: 12px;
        color: #b4b4b4;
    }

    .highlighted .addr {
        color: #ddd;
    }
    .empty_space {
        color: #ffffff;
    }

</style>