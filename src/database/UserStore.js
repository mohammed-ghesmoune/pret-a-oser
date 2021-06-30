import Store from './Store'
import {passwordVerify} from '../functions'

class UserStore extends Store {


  // connexion
  login(user) {

    return this.findOneBy('email', user.email).then(result => {
      if (result && passwordVerify(user.password,result.password)) {
        sessionStorage.setItem('isUserAuth', JSON.stringify({id:result.id,role:result.role}))
        return {
          type: "success",
          msg: "Vous avez été connecté avec succès !",
          //user: result
        }
      } else {
        return {
          type: "danger",
          msg: "Indentifiants incorrects ! "
        }
      }
    })
  }

  //inscription
  signup(user) {

    return this.findOneBy('email', user.email).then(isUserExists => {
      if (isUserExists) {
        return {
          type: 'danger',
          msg: "Adresse email already used",
        }
      } else {
        return this.add(user).then(isUserAdded => {
          if (isUserAdded) {
            return {
              type: 'success',
              msg: "Modifications registred",
              user
            }
          }
        })
      }

    })
  }

  updateUser(user) {

    return this.findOneById(user.id).then(result => {
      if (result && user.email === result.email) {
        return this.add(user).then(isUserAdded => {
          if (isUserAdded) {
            return {
              type: 'success',
              msg: "Modifications registred",
              user
            }
          }
        })
      } else {
        return this.signup(user)
      }

    })

  }


  //deconnexion
  logout() {
    sessionStorage.removeItem('isUserAuth')
  }
}

export default UserStore;