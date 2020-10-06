function SelftAssessment(haveSymptoms, listSymptoms){
    this.haveSymptoms = haveSymptoms;
    this.listSymptoms = listSymptoms;
}

SelftAssessment.prototype.submitSelfAssessment(haveSymptoms, listSymptoms){
    console.log("submitSelfAssessment");
}

SelftAssessment.prototype.addSymptoms(symptoms){
    console.log("add symptoms")
}