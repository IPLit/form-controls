import ScriptRunner from 'src/helpers/scriptRunner';

export function executeEventsFromCurrentRecord(currentRecord, rootRecord, patient, formScope) {
  let recordTree = rootRecord || currentRecord;
  if (!currentRecord.children) {
    return recordTree;
  }
  currentRecord.children.forEach(record => {
    recordTree = executeEventsFromCurrentRecord(record, recordTree, patient, formScope);
    if (record.control && record.control.events) {
      const eventKeys = Object.keys(record.control.events);
      eventKeys.forEach(eventKey => {
        const script = record.control.events[eventKey];
        recordTree = new ScriptRunner(recordTree, patient, currentRecord, formScope)
          .execute(script);
      });
    }
  });
  return recordTree;
}
