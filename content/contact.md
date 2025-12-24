---
title: "Contact Us"
description: "Get in touch with our community action group"
date: 2024-12-23
---

<div class="container py-5">
    <div class="row mb-5">
        <div class="col-lg-8 mx-auto text-center">
            <h1 class="display-4 mb-3">Contact Us</h1>
            <p class="lead text-muted">Have questions? Want to get involved? We're here to help.</p>
        </div>
    </div>

    <!-- Contact Points Section -->
    <div class="row mb-5">
        <div class="col-lg-10 mx-auto">
            <h2 class="mb-4">Our Team</h2>
            <div class="row g-4">
                <!-- Leadership -->
                <div class="col-md-6">
                    <div class="card h-100 border-primary">
                        <div class="card-body">
                            <div class="d-flex align-items-center mb-3">
                                <i class="fas fa-users fa-2x text-primary me-3"></i>
                                <h4 class="mb-0">Leadership / Administration</h4>
                            </div>
                            <p class="text-muted mb-3">General inquiries, media requests, partnership opportunities</p>
                            <div class="mb-2">
                                <a href="mailto:christopher.gravitt01@gmail.com" class="btn btn-outline-primary btn-sm">
                                    <i class="fas fa-envelope me-2"></i>Contact Leadership
                                </a>
                            </div>
                            <div class="mb-2">
                                <a href="mailto:robert.beechner@gmail.com" class="btn btn-outline-primary btn-sm">
                                    <i class="fas fa-envelope me-2"></i>Contact Administration
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Website / Technical -->
                <div class="col-md-6">
                    <div class="card h-100">
                        <div class="card-body">
                            <div class="d-flex align-items-center mb-3">
                                <i class="fas fa-code fa-2x text-primary me-3"></i>
                                <h4 class="mb-0">Website / Technical</h4>
                            </div>
                            <p class="text-muted mb-3">Website issues, technical problems, code contributions</p>
                            <div class="mb-2">
                                <i class="fab fa-github me-2 text-primary"></i>
                                <a href="https://github.com/PLCMercenary/wacodatacenter" target="_blank">GitHub Repository</a>
                            </div>
                            <div class="mb-2">
                                <a href="mailto:plcmercenary@tuta.io" class="btn btn-outline-primary btn-sm">
                                    <i class="fas fa-envelope me-2"></i>Contact Webmaster
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- General Contact Form -->
    <div class="row">
        <div class="col-lg-8 mx-auto">
            <div class="card border-0 shadow">
                <div class="card-body p-5">
                    <h2 class="mb-4">Send Us a Message</h2>
                    <p class="text-muted mb-4">Have a question or want to get involved? Fill out the form below and we'll get back to you as soon as possible.</p>
                    
                    <form name="contact" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" action="/contact-thank-you/">
                        <input type="hidden" name="form-name" value="contact">
                        <p style="display:none;">
                            <label>Don't fill this out if you're human: <input name="bot-field" /></label>
                        </p>

                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label for="contact-name" class="form-label">Name <span class="text-danger">*</span></label>
                                <input type="text" class="form-control" id="contact-name" name="name" required>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="contact-email" class="form-label">Email <span class="text-danger">*</span></label>
                                <input type="email" class="form-control" id="contact-email" name="email" required>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label for="contact-phone" class="form-label">Phone (optional)</label>
                                <input type="tel" class="form-control" id="contact-phone" name="phone">
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="contact-subject" class="form-label">Subject <span class="text-danger">*</span></label>
                                <select class="form-select" id="contact-subject" name="subject" required>
                                    <option value="">Select a topic...</option>
                                    <option value="General Inquiry">General Inquiry</option>
                                    <option value="Media Request">Media Request</option>
                                    <option value="Research Question">Research Question</option>
                                    <option value="Get Involved">I Want to Get Involved</option>
                                    <option value="Website Issue">Website/Technical Issue</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>

                        <div class="mb-3">
                            <label for="contact-message" class="form-label">Message <span class="text-danger">*</span></label>
                            <textarea class="form-control" id="contact-message" name="message" rows="6" required></textarea>
                        </div>

                        <div class="mb-3 form-check">
                            <input type="checkbox" class="form-check-input" id="contact-consent" name="consent" required>
                            <label class="form-check-label" for="contact-consent" style="font-size: 14px;">
                                I agree to be contacted regarding my inquiry. See our <a href="/privacy/" target="_blank">Privacy Policy</a>.
                            </label>
                        </div>

                        <button type="submit" class="btn btn-primary btn-lg w-100">Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Additional Info -->
    <div class="row mt-5">
        <div class="col-lg-8 mx-auto">
            <div class="alert alert-info">
                <h5 class="alert-heading"><i class="fas fa-info-circle me-2"></i>Response Time</h5>
                <p class="mb-0">We're a volunteer-run organization. We typically respond within 24-48 hours. For urgent matters, please email our leadership team directly.</p>
            </div>
            
            <div class="text-center mt-4">
                <h5 class="mb-3">Join the Movement</h5>
                <a href="https://www.change.org/p/stop-infrakey-data-center-from-building-in-lacy-lakeview" class="btn btn-outline-primary me-2">Sign the Petition</a>
                <a href="/posts/" class="btn btn-outline-primary">Read Our Research</a>
            </div>
        </div>
    </div>
</div>
