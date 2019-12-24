import Vue from 'vue'
import DialogController from '../components/dialog-controller/index'

Vue.use(DialogController, {
    width: '600px',
    'close-on-click-modal': false,
    'close-on-press-escape': false,
});
