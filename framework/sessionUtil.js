var authority = require('./authority');


module.exports = {
  createUserInfo:function(userInfo){
      var tmp = userInfo?userInfo:{};
      !tmp.roles && (tmp.roles = []);
      tmp.setRoles = function(_roles){
          this.roles = _roles;
          return this;
      };
      tmp.getRoles = function(){
          var that = this;
          return {
              isPermission:function(expr){
                  if(!that.roles)
                      return false;
                  return authority.isPermission(that.roles,expr);
              }
          };
      };
      return tmp;
  }
};
