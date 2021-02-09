import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../actions/profile";

const initialState = {
  department: "",
  email: "",
  number: "",
  website: "",
  location: "",
  status: "",
  bio: "",
  skills: "",
  studentId: "",
  githubusername: "",
  youtube: "",
  facebook: "",
  linkedin: "",
  researchgate: "",
};

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history,
}) => {
  const [formData, setFormData] = useState(initialState);

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  useEffect(() => {
    if (!profile) getCurrentProfile();
    if (!loading && profile) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      for (const key in profile.social) {
        if (key in profileData) profileData[key] = profile.social[key];
      }
      if (Array.isArray(profileData.skills))
        profileData.skills = profileData.skills.join(", ");
      setFormData(profileData);
    }
  }, [loading, getCurrentProfile, profile]);

  const {
    department,
    email,
    number,
    website,
    location,
    status,
    bio,
    skills,
    studentId,
    githubusername,
    youtube,
    facebook,
    linkedin,
    researchgate,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history, profile ? true : false);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Edit Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user" /> Add some changes to your profile
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <label className="form-text">Department</label>
          <select
            name="department"
            value={department}
            onChange={onChange}
            required
          >
            <option value=" " selected disabled hidden>
              * Select Department
            </option>
            <option value="CSE">CSE</option>
            <option value="EEE">EEE</option>
            <option value="CEE">CEE</option>
            <option value="MCE">MCE</option>
            <option value="BTM">BTM</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-text">Email</label>
          <input
            type="text"
            placeholder="* Email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-text">Phone Number</label>
          <input
            type="text"
            placeholder="Phone Number"
            name="number"
            value={number}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label className="form-text">Website</label>
          <input
            type="text"
            placeholder="Website"
            name="website"
            value={website}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label className="form-text">Location</label>
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={onChange}
          />
          <small className="form-text">(eg. Dhaka,Chittagong)</small>
        </div>

        <div className="form-group">
          <label className="form-text">Status</label>
          <select name="status" value={status} onChange={onChange} required>
            <option value=" " selected disabled hidden>
              * Select Status
            </option>
            <option value="Student">Student</option>
            <option value="Lecturer">Lecturer</option>
            <option value="Associate Professor">Associate Professor</option>
            <option value="Professor">Professor</option>
          </select>
        </div>

        <div className="form-group">
          <textarea
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={onChange}
          />
          <small className="form-text"> about </small>
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="* Skills"
            name="skills"
            value={skills}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* ID"
            name="studentId"
            value={studentId}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            value={githubusername}
            onChange={onChange}
          />
          <small className="form-text">include your github username</small>
        </div>

        <div className="my-2">
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type="button"
            className="btn btn-light"
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInputs && (
          <Fragment>
            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x" />
              <input
                type="text"
                placeholder="YouTube URL"
                name="youtube"
                value={youtube}
                onChange={onChange}
              />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x" />
              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={onChange}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x" />
              <input
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
                value={linkedin}
                onChange={onChange}
              />
            </div>
            <div className="form-group social-input">
              <i class="fab fa-researchgate"></i>
              <input
                type="text"
                placeholder="ResearchGate URL"
                name="researchgate"
                value={researchgate}
                onChange={onChange}
              />
            </div>
          </Fragment>
        )}

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  EditProfile
);
