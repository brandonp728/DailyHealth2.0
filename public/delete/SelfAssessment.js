function SelftAssessment(haveSymptoms, listSymptoms) {
  this.haveSymptoms = haveSymptoms;
  this.listSymptoms = listSymptoms;
}

SelftAssessment.submitSelfAssessment(haveSymptoms, listSymptoms);
{
  console.log("submitSelfAssessment");
  if (!haveSymptoms) {
    //sumit to database
    console.log("no Symptoms");
  } else {
    console.log("record symptoms");
  }
}

SelftAssessment.addSymptoms(symptoms);
{
  console.log("add symptoms");
}
