const express = require('express');
const User = require('../models/user');

const ajaxRouter = express.Router();

ajaxRouter.route('/')
    .get((req, res) => {
        User.findById(req.user._id, (err, user) => {
            if(err) return res.send(500, {error: err});
            res.json({data: user});
        });
    });

ajaxRouter.route('/:form_id')
    .get((req, res) => {
        if(req.params.form_id == 'grad') {
            User.findById(req.user._id, (err, user) => {
                if(err) return res.send(500, {error: err});
                res.json(user.resume.education.graduation);
            });
        }
        else if(req.params.form_id == 'post_grad') {
            User.findById(req.user._id, (err, user) => {
                if(err) return res.send(500, {error: err});
                res.json(user.resume.education.post_graduation);
            });
        }
        else if(req.params.form_id == 'sen_sec') {
            User.findById(req.user._id, (err, user) => {
                if(err) return res.send(500, {error: err});
                res.json(user.resume.education.sen_secondary);
            });
        }
        else if(req.params.form_id == 'sec') {
            User.findById(req.user._id, (err, user) => {
                if(err) return res.send(500, {error: err});
                res.json(user.resume.education.secondary);
            });
        }
        else if(req.params.form_id == 'dip') {
            User.findById(req.user._id, (err, user) => {
                if(err) return res.send(500, {error: err});
                res.json(user.resume.education.diploma);
            });
        }
        else if(req.params.form_id == 'phd') {
            User.findById(req.user._id, (err, user) => {
                if(err) return res.send(500, {error: err});
                res.json(user.resume.education.phd);
            });
        }
        else if(req.params.form_id == 'sample') {
            User.findById(req.user._id, (err, user) => {
                if(err) return res.send(500, {error: err});
                res.json(user.resume.sample);
            });
        }
    })
    .post((req, res) => {
        if(req.params.form_id == 'grad_form') {
            User.findByIdAndUpdate(req.user._id, {'resume.education.graduation': req.body}, (err, doc) => {
                    if (err) return res.send(500, {error: err});
                    if (!doc.resume.education.graduation) {
                        res.json({message: "Successfully Saved !!"});
                    } else {
                        res.json({message: "Successfully Updated !!"});
                    }
                });
        }
        else if(req.params.form_id == 'post_grad_form') {
            User.findByIdAndUpdate(req.user._id, {'resume.education.post_graduation': req.body}, (err, doc) => {
                    if (err) return res.send(500, {error: err});
                    if (!doc.resume.education.post_graduation) {
                        res.json({message: "Successfully Saved !!"});
                    } else {
                        res.json({message: "Successfully Updated !!"});
                    }
                });
        }
        else if(req.params.form_id == 'sen_sec_form') {
            User.findByIdAndUpdate(req.user._id, {'resume.education.sen_secondary': req.body}, (err) => {
                    if (err) return res.send(500, {error: err});
                    res.json({message: "Successfully Saved !!"});
                });
        }
        else if(req.params.form_id == 'sec_form') {
            User.findByIdAndUpdate(req.user._id, {'resume.education.secondary': req.body}, (err) => {
                    if (err) return res.send(500, {error: err});
                    res.json({message: "Successfully Saved !!"});
                });
        }
        else if(req.params.form_id == 'dip_form') {
            User.findByIdAndUpdate(req.user._id, {'resume.education.diploma': req.body}, (err) => {
                    if (err) return res.send(500, {error: err});
                    res.json({message: "Successfully Saved !!"});
                });
        }
        else if(req.params.form_id == 'phd_form') {
            User.findByIdAndUpdate(req.user._id, {'resume.education.phd': req.body}, (err) => {
                    if (err) return res.send(500, {error: err});
                    res.json({message: "Successfully Saved !!"});
                });
        }
        else if(req.params.form_id == 'job_form') {
            User.findById(req.user._id, (err, user) => {
                    if (err) return res.status(500).send({error: err});
                    user.resume.job.push(req.body);
                    user.save();
                    res.json({message: "Successfully Saved !!"});
                });
        }
        else if(req.params.form_id == 'internship_form') {
            User.findById(req.user._id, (err, user) => {
                    if (err) return res.status(500).send({error: err});
                    user.resume.internship.push(req.body);
                    user.save();
                    res.json({message: "Successfully Saved !!"});
                });
        }
        else if(req.params.form_id == 'responsibility_form') {
            User.findById(req.user._id, (err, user) => {
                    if (err) return res.status(500).send({error: err});
                    user.resume.responsibility.push(req.body);
                    user.save();
                    res.json({message: "Successfully Saved !!"});
                });
        }
        else if(req.params.form_id == 'training_form') {
            User.findById(req.user._id, (err, user) => {
                    if (err) return res.status(500).send({error: err});
                    user.resume.training.push(req.body);
                    user.save();
                    res.json({message: "Successfully Saved !!"});
                });
        }
        else if(req.params.form_id == 'project_form') {
            User.findById(req.user._id, (err, user) => {
                    if (err) return res.status(500).send({error: err});
                    user.resume.project.push(req.body);
                    user.save();
                    res.json({message: "Successfully Saved !!"});
                });
        }
        else if(req.params.form_id == 'skills_form') {
            User.findById(req.user._id, (err, user) => {
                    if (err) return res.status(500).send({error: err});
                    user.resume.skills.push(req.body);
                    user.save();
                    res.json({message: "Successfully Saved !!"});
                });
        }
        else if(req.params.form_id == 'sample_form') {
            User.findByIdAndUpdate(req.user._id, {'resume.sample': req.body}, (err) => {
                    if (err) return res.send(500, {error: err});
                    res.json({message: "Successfully Saved !!"});
                });
        }
        else if(req.params.form_id == 'additional_form') {
            User.findById(req.user._id, (err, user) => {
                    if (err) return res.status(500).send({error: err});
                    user.resume.additional.push(req.body);
                    user.save();
                    res.json({message: "Successfully Saved !!"});
                });
        }
    })
    .delete((req, res) => {
        if(req.params.form_id == 'grad') {
            User.findByIdAndUpdate(req.user._id, {$unset: { 'resume.education.graduation': 1}}, (err, doc) => {
                if (err) return res.send(500, {error: err});
                res.json({message: "Successfully Deleted !!"});
            });
        }
        else if(req.params.form_id == 'post_grad') {
            User.findByIdAndUpdate(req.user._id, {$unset: { 'resume.education.post_graduation': 1}}, (err, doc) => {
                if (err) return res.send(500, {error: err});
                res.json({message: "Successfully Deleted !!"});
            });
        }
        else if(req.params.form_id == 'sen_sec') {
            User.findByIdAndUpdate(req.user._id, {$unset: { 'resume.education.sen_secondary': 1}}, (err, doc) => {
                if (err) return res.send(500, {error: err});
                res.json({message: "Successfully Deleted !!"});
            });
        }
        else if(req.params.form_id == 'sec') {
            User.findByIdAndUpdate(req.user._id, {$unset: { 'resume.education.secondary': 1}}, (err) => {
                if (err) return res.send(500, {error: err});
                res.json({message: "Successfully Deleted !!"});
            });
        }
        else if(req.params.form_id == 'dip') {
            User.findByIdAndUpdate(req.user._id, {$unset: { 'resume.education.diploma': 1}}, (err) => {
                if (err) return res.send(500, {error: err});
                res.json({message: "Successfully Deleted !!"});
            });
        }
        else if(req.params.form_id == 'phd') {
            User.findByIdAndUpdate(req.user._id, {$unset: { 'resume.education.phd': 1}}, (err) => {
                if (err) return res.send(500, {error: err});
                res.json({message: "Successfully Deleted !!"});
            });
        }
        else if(req.params.form_id == 'sample') {
            User.findByIdAndUpdate(req.user._id, {$unset: { 'resume.sample': 1}}, (err) => {
                if (err) return res.send(500, {error: err});
                res.json({message: "Successfully Deleted !!"});
            });
        }
    }); 
    
ajaxRouter.route('/job/:id')
    .get((req, res) => {
        User.findById(req.user._id, (err, user) => {
            if(err) return res.send(500, {error: err});
            user.resume.job.forEach(j => {
                if (j._id == req.params.id) return res.json(j);
            });
        });
    })
    .post((req, res) => {
        User.findOneAndUpdate({"_id": req.user._id, "resume.job._id": req.params.id}, {$set: {"resume.job.$": req.body}}, (err, user) => {
            if (err) return res.status(500).send({error: err});
            if(!user) return res.status(404).send({error: 'User not found'});
            if(user) {
                res.json({message: "Successfully Updated !!"});
            }
        });
    })
    .delete((req, res) => {
        User.findById(req.user._id, (err, user) => {
            if (err) return res.status(500).send({error: err});
            user.resume.job = user.resume.job.filter(j => j._id != req.params.id);
            user.save();
            res.json({message: "Successfully Deleted !!"});
        });
    });

ajaxRouter.route('/internship/:id')
    .get((req, res) => {
        User.findById(req.user._id, (err, user) => {
            if(err) return res.send(500, {error: err});
            user.resume.internship.forEach(j => {
                if (j._id == req.params.id) return res.json(j);
            });
        });
    })
    .post((req, res) => {
        User.findOneAndUpdate({"_id": req.user._id, "resume.internship._id": req.params.id}, {$set: {"resume.internship.$": req.body}}, (err, user) => {
            if (err) return res.status(500).send({error: err});
            if(!user) return res.status(404).send({error: 'User not found'});
            if(user) {
                res.json({message: "Successfully Updated !!"});
            }
        });
    })
    .delete((req, res) => {
        User.findById(req.user._id, (err, user) => {
            if (err) return res.status(500).send({error: err});
            user.resume.internship = user.resume.internship.filter(j => j._id != req.params.id);
            user.save();
            res.json({message: "Successfully Deleted !!"});
        });
    });

ajaxRouter.route('/responsibility/:id')
    .get((req, res) => {
        User.findById(req.user._id, (err, user) => {
            if(err) return res.send(500, {error: err});
            user.resume.responsibility.forEach(j => {
                if (j._id == req.params.id) return res.json(j);
            });
        });
    })
    .post((req, res) => {
        User.findOneAndUpdate({"_id": req.user._id, "resume.responsibility._id": req.params.id}, {$set: {"resume.responsibility.$": req.body}}, (err, user) => {
            if (err) return res.status(500).send({error: err});
            if(!user) return res.status(404).send({error: 'User not found'});
            if(user) {
                res.json({message: "Successfully Updated !!"});
            }
        });
    })
    .delete((req, res) => {
        User.findById(req.user._id, (err, user) => {
            if (err) return res.status(500).send({error: err});
            user.resume.responsibility = user.resume.responsibility.filter(j => j._id != req.params.id);
            user.save();
            res.json({message: "Successfully Deleted !!"});
        });
});

ajaxRouter.route('/training/:id')
    .get((req, res) => {
        User.findById(req.user._id, (err, user) => {
            if(err) return res.send(500, {error: err});
            user.resume.training.forEach(j => {
                if (j._id == req.params.id) return res.json(j);
            });
        });
    })
    .post((req, res) => {
        User.findOneAndUpdate({"_id": req.user._id, "resume.training._id": req.params.id}, {$set: {"resume.training.$": req.body}}, (err, user) => {
            if (err) return res.status(500).send({error: err});
            if(!user) return res.status(404).send({error: 'User not found'});
            if(user) {
                res.json({message: "Successfully Updated !!"});
            }
        });
    })
    .delete((req, res) => {
        User.findById(req.user._id, (err, user) => {
            if (err) return res.status(500).send({error: err});
            user.resume.training = user.resume.training.filter(j => j._id != req.params.id);
            user.save();
            res.json({message: "Successfully Deleted !!"});
        });
});

ajaxRouter.route('/project/:id')
    .get((req, res) => {
        User.findById(req.user._id, (err, user) => {
            if(err) return res.send(500, {error: err});
            user.resume.project.forEach(j => {
                if (j._id == req.params.id) return res.json(j);
            });
        });
    })
    .post((req, res) => {
        User.findOneAndUpdate({"_id": req.user._id, "resume.project._id": req.params.id}, {$set: {"resume.project.$": req.body}}, (err, user) => {
            if (err) return res.status(500).send({error: err});
            if(!user) return res.status(404).send({error: 'User not found'});
            if(user) {
                res.json({message: "Successfully Updated !!"});
            }
        });
    })
    .delete((req, res) => {
        User.findById(req.user._id, (err, user) => {
            if (err) return res.status(500).send({error: err});
            user.resume.project = user.resume.project.filter(j => j._id != req.params.id);
            user.save();
            res.json({message: "Successfully Deleted !!"});
        });
});

ajaxRouter.route('/skill/:id')
    .get((req, res) => {
        User.findById(req.user._id, (err, user) => {
            if(err) return res.send(500, {error: err});
            user.resume.skills.forEach(j => {
                if (j._id == req.params.id) return res.json(j);
            });
        });
    })
    .post((req, res) => {
        User.findOneAndUpdate({"_id": req.user._id, "resume.skills._id": req.params.id}, {$set: {"resume.skills.$": req.body}}, (err, user) => {
            if (err) return res.status(500).send({error: err});
            if(!user) return res.status(404).send({error: 'User not found'});
            if(user) {
                res.json({message: "Successfully Updated !!"});
            }
        });
    })
    .delete((req, res) => {
        User.findById(req.user._id, (err, user) => {
            if (err) return res.status(500).send({error: err});
            user.resume.skills = user.resume.skills.filter(j => j._id != req.params.id);
            user.save();
            res.json({message: "Successfully Deleted !!"});
        });
});

ajaxRouter.route('/additional/:id')
    .get((req, res) => {
        User.findById(req.user._id, (err, user) => {
            if(err) return res.send(500, {error: err});
            user.resume.additional.forEach(j => {
                if (j._id == req.params.id) return res.json(j);
            });
        });
    })
    .post((req, res) => {
        User.findOneAndUpdate({"_id": req.user._id, "resume.additional._id": req.params.id}, {$set: {"resume.additional.$": req.body}}, (err, user) => {
            if (err) return res.status(500).send({error: err});
            if(!user) return res.status(404).send({error: 'User not found'});
            if(user) {
                res.json({message: "Successfully Updated !!"});
            }
        });
    })
    .delete((req, res) => {
        User.findById(req.user._id, (err, user) => {
            if (err) return res.status(500).send({error: err});
            user.resume.additional = user.resume.additional.filter(j => j._id != req.params.id);
            user.save();
            res.json({message: "Successfully Deleted !!"});
        });
});


module.exports = ajaxRouter;