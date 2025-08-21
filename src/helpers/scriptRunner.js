import FormContext from './FormContext';
import { httpInterceptor } from '../helpers/httpInterceptor';
import ReactHtmlParser from 'react-html-parser';

export default class ScriptRunner {

  constructor(rootRecord, patient, parentRecord) {
    this.formContext = new FormContext(rootRecord, patient, parentRecord);
    this.interceptor = httpInterceptor;
  }

  execute(eventJs) {
    const formContext = this.formContext;
    const interceptor = this.interceptor;
    if (eventJs && interceptor && eventJs.length > 0) {
      const scriptModed = ReactHtmlParser(eventJs, {decodeEntities: true});
      if (scriptModed && scriptModed.length > 0) {
        const script = scriptModed.at(0);
        const executiveJs = `(${script})(formContext, interceptor)`;
        /* eslint-disable */
        eval(executiveJs);
      }
    }
    return formContext.getRecords();
  }

}
