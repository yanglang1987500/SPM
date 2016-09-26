/**
 * Created by sniyve on 2016/9/26.
 */
var roleDao = require('./daos/roleDao');


roleDao.addRole({
    role_name:'管理员',
},function(err,data){
   console.log(err);
   console.log(data);
});

roleDao.roleListSearchById('25b2f761dc0c1936d5bed293e7f77010',function(err,data){
   console.log(err);
   console.log(data);
});

roleDao.modifyMenu({
    role_name:'222',
    role_id:'25b2f761dc0c1936d5bed293e7f77010'
},function(err,data){
   console.log(err);
   console.log(data);

});

roleDao.removeRole('7735f70042cb792eb82418ce2f2d9a29',function(err,data){
    console.log(err);
    console.log(data);
});