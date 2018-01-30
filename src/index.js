import Observer from './Observer'
import Emitter from './Emitter'

export default {

	install(Vue, connection, store){

		if(!connection) throw new Error("[Vue-Socket.io] cannot locate connection")

		let observer = new Observer(connection, store)

		if(typeof connection === 'object'){
			Vue.prototype.$socket = []
			Object.keys(connection).forEach(key => {
				let socket = Vue.prototype.$socket[key] = observer.Sockets[key];
                Vue.prototype.$socket[key].$on = (evt, cb) => {
                	Emitter.addListener(evt, cb, this)
				}
                let super_onevent = socket.onevent;
                socket.onevent = (packet) => {
                    super_onevent.call(socket, packet);
                    Emitter.emit(packet.data[0], packet.data[1]);
                    if(store) observer.passToStoreWithKey(key.toUpperCase()+'_SOCKET_'+packet.data[0], ...packet.data.slice(1), key)
                };
			})
		}else{
			Vue.prototype.$socket = observer.Socket;
		}
	}
}
