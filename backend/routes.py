from app import app,db
from flask import request,jsonify
from models import Friend

# Get all friends
@app.route("/app/friends",methods=["GET"])
def get_friends():
    friends = Friend.query.all()
    result = [friend.to_json() for friend in friends]
    return jsonify(result)


# Create a friend
@app.route("/app/friends",methods=["POST"])
def create_friend():
    try:
        data = request.json # Extract dtat from JSON request
        
        # Retrive specific fields
        name = data.get("name")
        role = data.get("role")
        description = data.get("description")
        gender = data.get("gender")
        
        # Fetch avatar imag based on gender
        if gender == "male":
            img_url = f"https://avatar.iran.liara.run/public/boy?username={name}"
        elif gender == "female":
            img_url = f"https://avatar.iran.liara.run/public/girl?username={name}"
        else:
            img_url = None    
            
        # creating in the Data base
        new_friend = Friend(name=name, role=role, description=description, gender=gender, img_url=img_url)
        
        db.session.add(new_friend)# add
        db.session.commit() # commiting the change
        
        return jsonify({"msg":"Friend created successfully"}),201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({"error":str(e)}), 500
        
        
# Delete a friend
@app.route("/app/friends/<int:id>",methods=["DELETE"])
def delete_friend(id):
    try:
        friend = Friend.query.get(id) # Retrive the friend by ID
        
        # check: if the friend exists
        if friend is None:
            return jsonify({"error":"Friend not found"}), 404
        
        # Delete the friend from db
        db.session.delete(friend)
        db.session.commit()
        return jsonify({"msg":"Friend deleted"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error":str(e)}), 500
    
# Update a Friend
@app.route("/app/friends/<int:id>",methods=["PATCH"])
def update_friend(id):
    try:
        friend = Friend.query.get(id) # Retrive the friend by ID
        
        # check: if the friend exists
        if friend is None:
            return jsonify({"error":"Friend not found"}), 404
            
        # Data to change
        data = request.json
        
        # Update specific fields with fallback to current values if not provided
        friend.name = data.get("name",friend.name) 
        friend.role = data.get("role",friend.role) 
        friend.description = data.get("description",friend.description) 
        friend.gender = data.get("gender", friend.gender)
        
        # Update avatar image URL based on new gender
        if friend.gender == "male":
            friend.img_url = f"https://avatar.iran.liara.run/public/boy?username={friend.name}"
        elif friend.gender == "female":
            friend.img_url = f"https://avatar.iran.liara.run/public/girl?username={friend.name}"
        
        # Commit changes to the database
        # directly staged the fields above
        db.session.commit()
        return jsonify({"msg":"Friend Updated"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error":str(e)}), 500