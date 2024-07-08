const mongoose = require('mongoose');
const localPassport = require('passport-local-mongoose');

const resumeSchema = new mongoose.Schema({
    education: {
        graduation: {
            grad_status: String,
            grad_college: String,
            grad_start_year: String,
            grad_end_year: String,
            grad_degree: String,
            grad_stream: String,
            grad_performance: String
        },
        post_graduation: {
            post_grad_status: String,
            post_grad_college: String,
            post_grad_start_year: String,
            post_grad_end_year: String,
            post_grad_degree: String,
            post_grad_stream: String,
            post_grad_performance: String
        },
        secondary: {
            sec_status: String,
            sec_year: String,
            sec_board: String,
            sec_performance: String,
            sec_school: String
        },
        sen_secondary: {
            sen_sec_status: String,
            sen_sec_year: String,
            sen_sec_board: String,
            sen_sec_performance: String,
            sen_sec_stream: String,
            sen_sec_school: String
        },
        diploma: {
            dip_status: String,
            dip_college: String,
            dip_start_year: String,
            dip_end_year: String,
            dip_stream: String,
            dip_performance: String
        },
        phd: {
            phd_status: String,
            phd_college: String,
            phd_start_year: String,
            phd_end_year: String,
            phd_stream: String,
            phd_performance: String
        }
    },
    job: [{
        profile: String,
        org: String,
        location: String,
        isWFH: Boolean,
        startD: Date,
        endD: Date,
        cWorking: Boolean,
        desc: String
    }],
    internship: [{
        profile: String,
        org: String,
        location: String,
        isWFH: Boolean,
        startD: Date,
        endD: Date,
        cWorking: Boolean,
        desc: String
    }],
    responsibility: [{
        desc: String
    }],
    training: [{
        prog: String,
        org: String,
        location: String,
        isOnline: Boolean,
        startD: Date,
        endD: Date,
        cWorking: Boolean,
        desc: String
    }],
    project: [{
        title: String,
        startD: Date,
        endD: Date,
        cWorking: Boolean,
        desc: String,
        pLink: String 
    }],
    skills: [{
        skill: String,
        level: String
    }],
    sample: {
        blog: String,
        github: String,
        playstore: String,
        behance: String,
        other: String
    },
    additional : [{
        detail: String
    }]
});
const userSchema = new mongoose.Schema({
        email: {
            type: String,
            required: true,
            lowercase:true,
            unique:true
        },
        // password: {
        //     type: String,
        //     required: true
        // },
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String
        },
        mobileNo: {
            type: Number,
            required: true,
            min:1000000000,
            max:9999999999
        },
        dob: {
            type: Date
        },
        resume: {
            type: resumeSchema,
            default: {education: {graduation: null}}
        }
            
    },{
        timestamps: true
    }
);
userSchema.plugin(localPassport);
const User = new mongoose.model('User', userSchema);
module.exports = User;