function App() {
    return {
        page: 1,
        years: [], 
        semesters: [],
        Batch: [],
        gpa: [],
        selectedyear: null,
        selectedsemester: null,

        async getYears() {
            try {
                const response = await fetch('/api/years');
                const years = await response.json();
                console.log(years);
                this.years = years;
            } catch (error) {
                console.error('Error fetching years:', error);
            }
        },
        async getSemesters(year) {
            try {
                console.log(year);
                this.selectedyear = year;
                const response = await fetch(`/api/Semesters/${year}`);
                const semesters = await response.json();
                console.log(semesters);
                this.page = 2;
                this.semesters = semesters;
            } catch (error) {
                console.error('Error fetching semesters:', error);
            }
        },

        async getBatch(semester) {  
            try {
                console.log(semester);
                this.selectedsemester = semester;
                const response = await fetch(`/api/Batch/${this.selectedyear}/${semester}`);
                const Batch = await response.json();
                console.log(Batch);
                this.page = 3;
                this.Batch = Batch;
            } catch (error) {
                console.error('Error fetching Batch:', error);
            }
        },

        async getGPA(batch) {
            try {
                console.log(batch);
                const response = await fetch(`/api/GPA/${this.selectedyear}/${this.selectedsemester}/${batch}`);
                const gpa = await response.json();
                console.log(gpa);
                this.page = 4;
                this.gpa = gpa;
            } catch (error) {
                console.error('Error fetching GPA:', error);
            }
        }
    };
}
